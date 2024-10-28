// src/routes/proveedoresRoutes.js
import express from 'express';
import { renderProveedores, crearProveedor, renderNuevoProveedor, renderEditarProveedor, actualizarProveedor, eliminarProveedor } from '../controllers/proveedoresController.js';

const router = express.Router();

router.get('/', renderProveedores);  // Listar proveedores
router.get('/nuevo', renderNuevoProveedor);  // Formulario para nuevo proveedor
router.post('/', crearProveedor);  // Crear proveedor
router.get('/editar/:id', renderEditarProveedor);  // Formulario para editar proveedor
router.post('/:id', actualizarProveedor);  // Actualizar proveedor
router.delete('/:id', eliminarProveedor);  // Eliminar proveedor

export default router;
