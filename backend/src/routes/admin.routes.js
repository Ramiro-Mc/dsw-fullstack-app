import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';

const router = Router();

// Ruta para obtener estadísticas del dashboard
router.get('/stats', adminController.getStats);

export default router;