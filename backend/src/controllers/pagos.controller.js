import { AlumnoCurso } from "../models/Alumnos_Cursos.js";
import { Curso } from "../models/Curso.js";
import { Usuario } from "../models/Usuario.js";
import { TipoCurso } from "../models/TipoCurso.js";

import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});


export const pagoController = {
  
  // Obtener datos del curso para checkout
  getCursoCheckout: async (req, res) => {
    try {
      const { idCurso } = req.params;
      
      const curso = await Curso.findByPk(idCurso, {
        where: { estado: 'aprobado' }, // Solo cursos aprobados
        include: [
          { model: TipoCurso, as: "TipoCurso" },
          { model: Usuario, as: "Profesor", attributes: ['nombreUsuario'] }
        ]
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado o no disponible"
        });
      }

      res.status(200).json({
        success: true,
        msg: "Datos del curso obtenidos",
        contenido: curso
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor"
      });
    }
  },

  // Crear preferencia de MercadoPago
  crearPreferencia: async (req, res) => {
    try {
      const { idCurso, idUsuario } = req.body;

      const curso = await Curso.findByPk(idCurso, {
        where: { estado: 'aprobado' },
        include: [{ model: TipoCurso, as: "TipoCurso" }]
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado"
        });
      }

      // Verificar si ya compró el curso
      const yaComprado = await AlumnoCurso.findOne({
        where: { idUsuario, idCurso, estadoPago: 'aprobado' }
      });

      if (yaComprado) {
        return res.status(400).json({
          success: false,
          msg: "Ya tienes este curso"
        });
      }

      // Crear preferencia en MercadoPago
      const preference = {
        items: [
          {
            title: curso.titulo,
            description: curso.descripcion,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: curso.precio
          }
        ],
        payer: {
          email: 'test@test.com' // Usar email real del usuario
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/checkout/success`,
          failure: `${process.env.FRONTEND_URL}/checkout/failure`,
          pending: `${process.env.FRONTEND_URL}/checkout/pending`
        },
        auto_return: 'approved',
        external_reference: `${idUsuario}_${idCurso}`, // Para identificar la compra
        notification_url: `${process.env.BACKEND_URL}/api/pagos/webhook`
      };

      const response = await mercadopago.preferences.create(preference);

      res.status(200).json({
        success: true,
        msg: "Preferencia creada",
        preferenceId: response.body.id,
        initPoint: response.body.init_point
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor"
      });
    }
  },

  // Webhook para notificaciones de MercadoPago
  webhook: async (req, res) => {
    try {
      const { type, data } = req.body;

      if (type === 'payment') {
        const payment = await mercadopago.payment.findById(data.id);
        const [idUsuario, idCurso] = payment.body.external_reference.split('_');

        // Actualizar o crear registro de compra
        if (payment.body.status === 'approved') {
          await AlumnoCurso.upsert({
            idUsuario: parseInt(idUsuario),
            idCurso: parseInt(idCurso),
            precioCompra: payment.body.transaction_amount,
            metodoPago: 'mercadopago',
            estadoPago: 'aprobado',
            transactionId: payment.body.id.toString()
          });
        }
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error');
    }
  },

  // Verificar estado del pago
  verificarPago: async (req, res) => {
    try {
      const { idUsuario, idCurso } = req.params;

      const compra = await AlumnoCurso.findOne({
        where: { idUsuario, idCurso }
      });

      res.status(200).json({
        success: true,
        msg: "Estado del pago",
        contenido: compra
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        msg: process.env.NODE_ENV === "development" 
          ? error.message 
          : "Error interno del servidor"
      });
    }
  }
};