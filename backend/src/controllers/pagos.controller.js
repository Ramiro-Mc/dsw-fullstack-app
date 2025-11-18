import { AlumnoCurso } from "../models/AlumnoCurso.js";
import { Curso } from "../models/Curso.js";
import { Usuario } from "../models/Usuario.js";
import { TipoCurso } from "../models/TipoCurso.js";
import Stripe from "stripe";

// Configurar Stripe con la clave secreta del .env
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null;

export const pagoController = {
  
  //  Obtener datos del curso para el checkout
  getCursoCheckout: async (req, res) => {
    try {
      const { idCurso } = req.params;
      console.log("=== DEBUG CHECKOUT ===");
      console.log("ID Curso recibido:", idCurso);

      const curso = await Curso.findOne({
        where: {
          idCurso: parseInt(idCurso),
          estado: "aprobado", // Solo cursos aprobados
        },
        include: [
          {
            model: TipoCurso,
            as: "TipoCurso",
            required: false,
          },
          {
            model: Usuario,
            as: "Profesor",
            attributes: ["nombreUsuario", "nombreReferido", "banco", "cvu", "alias"], // ← Incluir datos bancarios
            required: false,
          },
        ],
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado o no disponible",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Datos del curso obtenidos",
        contenido: curso,
      });
    } catch (error) {
      console.error("Error en getCursoCheckout:", error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor",
      });
    }
  },

  // Crear sesión de pago en Stripe
  crearSesionStripe: async (req, res) => {
    try {
      const { idCurso, idUsuario } = req.body;
      console.log("=== CREAR SESIÓN STRIPE ===");
      console.log("Body:", req.body);

      // Validar usuario
      if (!idUsuario) {
        return res.status(400).json({
          success: false,
          msg: "ID de usuario requerido",
        });
      }

      // Buscar el curso
      const curso = await Curso.findOne({
        where: {
          idCurso: parseInt(idCurso),
          estado: "aprobado",
        },
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado",
        });
      }

      // Verificar si ya está inscrito
      const inscripcionExistente = await AlumnoCurso.findOne({
        where: {
          idUsuario: parseInt(idUsuario),
          idCurso: parseInt(idCurso),
        },
      });

      if (inscripcionExistente) {
        return res.status(400).json({
          success: false,
          msg: "Ya estás inscrito en este curso",
        });
      }

      // Verificar que Stripe esté configurado
      if (!stripe) {
        return res.status(500).json({
          success: false,
          msg: "Stripe no está configurado. Verifica STRIPE_SECRET_KEY en .env",
        });
      }

      // Crear sesión de checkout en Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: curso.titulo,
                description: curso.descripcion || 'Curso online',
              },
              unit_amount: Math.round(parseFloat(curso.precio) * 100), // Stripe usa centavos
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
        metadata: {
          idUsuario: idUsuario.toString(),
          idCurso: idCurso.toString(),
        },
      });

      console.log("✅ Sesión creada:", session.id);

      res.status(200).json({
        success: true,
        msg: "Sesión de Stripe creada",
        sessionId: session.id,
        url: session.url,
      });

    } catch (error) {
      console.error("❌ Error en crearSesionStripe:", error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

  //  Webhook de Stripe - Registra inscripción automáticamente
  webhook: async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Verificar que el webhook viene de Stripe
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('❌ Error verificando webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('✅ Webhook recibido:', event.type);

    // Cuando el pago se completa
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log('=== PAGO COMPLETADO ===');
      console.log('Session:', session);

      const { idUsuario, idCurso } = session.metadata;

      try {
        const curso = await Curso.findByPk(parseInt(idCurso));

        if (curso) {
          //  AQUÍ SE GUARDA metodoPago: 'stripe'
          await AlumnoCurso.create({
            idUsuario: parseInt(idUsuario),
            idCurso: parseInt(idCurso),
            fechaCompra: new Date(),
            precioCompra: parseFloat(curso.precio),
            metodoPago: 'stripe', 
            estadoPago: 'aprobado',
            transactionId: session.payment_intent || session.id,
          });

          console.log('✅ Inscripción registrada automáticamente');
        }
      } catch (error) {
        console.error('❌ Error registrando inscripción:', error);
      }
    }

    res.json({ received: true });
  },

  //  Verificar estado de un pago
  verificarPago: async (req, res) => {
    try {
      const { sessionId } = req.params;

      if (!stripe) {
        return res.status(500).json({
          success: false,
          msg: "Stripe no configurado",
        });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      res.status(200).json({
        success: true,
        estadoPago: session.payment_status,
        metadata: session.metadata,
      });
    } catch (error) {
      console.error('❌ Error verificando pago:', error);
      res.status(500).json({
        success: false,
        msg: "Error al verificar pago",
      });
    }
  },

  //  Confirmar pago por transferencia bancaria
  confirmarTransferencia: async (req, res) => {
    try {
      const { idCurso, idUsuario } = req.body;

      console.log("=== CONFIRMAR TRANSFERENCIA ===");
      console.log("Body:", req.body);

      // Validar datos
      if (!idUsuario || !idCurso) {
        return res.status(400).json({
          success: false,
          msg: "ID de usuario e ID de curso requeridos",
        });
      }

      // Buscar el curso
      const curso = await Curso.findOne({
        where: {
          idCurso: parseInt(idCurso),
          estado: "aprobado",
        },
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado",
        });
      }

      // Verificar si ya está inscrito
      const inscripcionExistente = await AlumnoCurso.findOne({
        where: {
          idUsuario: parseInt(idUsuario),
          idCurso: parseInt(idCurso),
        },
      });

      if (inscripcionExistente) {
        return res.status(400).json({
          success: false,
          msg: "Ya estás inscrito en este curso",
        });
      }

      // Generar ID de transacción único
      const transactionId = `TRANSFER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      //  AQUÍ SE GUARDA metodoPago: 'transferencia'
      const nuevaInscripcion = await AlumnoCurso.create({
        idUsuario: parseInt(idUsuario),
        idCurso: parseInt(idCurso),
        fechaCompra: new Date(),
        precioCompra: parseFloat(curso.precio),
        metodoPago: "transferencia", // ← Método de pago: Transferencia
        estadoPago: "aprobado",
        transactionId: transactionId,
      });

      console.log(' Inscripción por transferencia registrada');

      res.status(201).json({
        success: true,
        msg: "Inscripción registrada correctamente",
        transactionId: transactionId,
        inscripcion: nuevaInscripcion,
      });
    } catch (error) {
      console.error(" Error en confirmarTransferencia:", error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};