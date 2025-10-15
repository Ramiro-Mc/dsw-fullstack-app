
import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';

const router = Router();


router.get('/stats', adminController.getStats);
router.get('/usuarios', adminController.getUsuarios);
router.delete('/usuarios/:idUsuario', adminController.eliminarUsuario);


export default router;