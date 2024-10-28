// src/routes/categoriasRoutes.js
import express from 'express';
import { renderCategorias, crearCategoria, renderNuevaCategoria, renderEditarCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/categoriasController.js';

const router = express.Router();

router.get('/', renderCategorias);  // Listar categorías
router.get('/nuevo', renderNuevaCategoria);  // Formulario para nueva categoría
router.post('/', crearCategoria);  // Crear categoría
router.get('/editar/:id', renderEditarCategoria);  // Formulario para editar categoría
router.post('/:id', actualizarCategoria);  // Actualizar categoría
router.delete('/:id', eliminarCategoria);  // Eliminar categoría

export default router;
