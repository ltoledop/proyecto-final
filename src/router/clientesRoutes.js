// src/router/user.js
import { Router } from 'express';
import { createCliente ,getClientes } from '../controllers/clientesController.js';

const router = Router();

// Ruta para manejar la creación de un nuevo usuario
router.get('/', getClientes);
router.post('/', createCliente);

export default router;
