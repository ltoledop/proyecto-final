// src/router/user.js
import { Router } from 'express';
import { registerUsuario ,loginUsuario,renderUsuarios ,renderDashboard } from '../controllers/usuariosController.js';
import { authenticate  } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para manejar la creación de un nuevo usuario
router.post('/login', loginUsuario);
router.get('/', renderUsuarios);
router.get('/dashboard', renderDashboard);
router.post('/registro', registerUsuario);
router.get('/registro', (req, res) => {
    res.render('registro');
});

export default router;
