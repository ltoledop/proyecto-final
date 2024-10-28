// src/routes/productosRoutes.js
import express from 'express';
import {
  renderProductos,
  crearProducto,
  renderNuevoProducto,
  renderEditarProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productosController.js';

const router = express.Router();
import upload  from '../middlewares/configuration.js'; // Reemplaza con la ruta real de multer

router.get('/', renderProductos); // Listar productos
router.get('/nuevo', renderNuevoProducto); // Formulario para nuevo producto
router.post('/', upload.single('imagen'), crearProducto);
router.get('/editar/:id', renderEditarProducto); // Formulario para editar producto
router.post('/:id', upload.single('imagen'), actualizarProducto);

router.delete('/:id', eliminarProducto); // Eliminar producto

export default router;
