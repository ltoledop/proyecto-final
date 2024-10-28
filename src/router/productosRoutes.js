import express from 'express';
import {
  renderProductos,
  crearProducto,
  renderNuevoProducto,
  renderEditarProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productosController.js';
import upload  from '../middlewares/configuration.js';

const router = express.Router();

router.get('/', renderProductos); 
router.get('/nuevo', renderNuevoProducto); 
router.post('/', upload.single('imagen'), crearProducto);
router.get('/editar/:id', renderEditarProducto);
router.post('/:id', upload.single('imagen'), actualizarProducto);
router.delete('/:id', eliminarProducto); 

export default router;
