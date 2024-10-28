import express from 'express';
import {
    renderProveedores,
    crearProveedor,
    renderNuevoProveedor,
    renderEditarProveedor,
    actualizarProveedor,
    eliminarProveedor
} from '../controllers/proveedoresController.js';

const router = express.Router();

router.get('/', renderProveedores);
router.get('/nuevo', renderNuevoProveedor);
router.post('/', crearProveedor);
router.get('/editar/:id', renderEditarProveedor);
router.post('/:id', actualizarProveedor);
router.delete('/:id', eliminarProveedor);

export default router;