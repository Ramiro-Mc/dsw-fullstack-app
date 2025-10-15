import { AlumnoCurso } from "../models/Alumnos_Cursos.js";
import { Curso } from "../models/Curso.js";
import { Usuario } from "../models/Usuario.js";
import { TipoCurso } from "../models/TipoCurso.js";
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago SOLO si tienes el token
const client = process.env.MERCADOPAGO_ACCESS_TOKEN 
  ? new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN })
  : null;

export const pagoController = {
  
  getCursoCheckout: async (req, res) => {
    try {
      const { idCurso } = req.params;
      console.log('=== DEBUG CHECKOUT ===');
      console.log('ID Curso recibido:', idCurso);
      
      const curso = await Curso.findOne({
        where: { 
          idCurso: parseInt(idCurso),
          estado: 'aprobado' 
        },
        include: [
          { 
            model: TipoCurso, 
            as: "TipoCurso",
            required: false 
          },
          { 
            model: Usuario, 
            as: "Profesor", 
            attributes: ['nombreUsuario'],
            required: false 
          }
        ]
      });

      console.log('Curso encontrado:', curso ? 'SÍ' : 'NO');

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
      console.error('Error en getCursoCheckout:', error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor"
      });
    }
  },

  crearPreferencia: async (req, res) => {
    try {
      const { idCurso, idUsuario } = req.body;
      console.log('=== CREAR PREFERENCIA ===');
      console.log('Body:', req.body);

      if (!idUsuario) {
        return res.status(400).json({
          success: false,
          msg: "ID de usuario requerido"
        });
      }

      const curso = await Curso.findOne({
        where: { 
          idCurso: parseInt(idCurso),
          estado: 'aprobado' 
        }
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          msg: "Curso no encontrado"
        });
      }

      // SIEMPRE SIMULAR en desarrollo para proteger tokens reales
      if (process.env.NODE_ENV === 'development') {
        console.log('Modo desarrollo - simulando pago');
        res.status(200).json({
          success: true,
          msg: "Preferencia creada (simulado para desarrollo)",
          preferenceId: `dev_${Date.now()}`,
          initPoint: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=dev_${Date.now()}`
        });
        return;
      }

      // Código real SOLO para producción
      if (client) {
        const preference = new Preference(client);
        
        const preferenceData = {
          items: [
            {
              id: curso.idCurso.toString(),
              title: curso.titulo,
              description: curso.descripcion || 'Curso online',
              quantity: 1,
              currency_id: 'ARS',
              unit_price: parseFloat(curso.precio)
            }
          ],
          payer: {
            email: 'test_user_123@testuser.com'
          },
          back_urls: {
            success: `${process.env.FRONTEND_URL}/checkout/success`,
            failure: `${process.env.FRONTEND_URL}/checkout/failure`,
            pending: `${process.env.FRONTEND_URL}/checkout/pending`
          },
          auto_return: 'approved',
          external_reference: `${idUsuario}_${idCurso}`,
          notification_url: `${process.env.BACKEND_URL}/api/pagos/webhook`
        };

        const response = await preference.create({ body: preferenceData });

        res.status(200).json({
          success: true,
          msg: "Preferencia creada",
          preferenceId: response.id,
          initPoint: response.init_point
        });
      } else {
        res.status(500).json({
          success: false,
          msg: "MercadoPago no configurado"
        });
      }

    } catch (error) {
      console.error('Error en crearPreferencia:', error);
      res.status(500).json({
        success: false,
        msg: "Error interno del servidor"
      });
    }
  },

  webhook: async (req, res) => {
    console.log('Webhook recibido:', req.body);
    res.status(200).send('OK');
  },

  verificarPago: async (req, res) => {
    res.status(200).json({ 
      success: true, 
      msg: "Verificación pendiente" 
    });
  }
};