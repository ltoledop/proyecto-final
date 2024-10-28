// src/controllers/proveedoresController.js
import pool from '../config/connection.js';

// Renderizar la página de proveedores
export const renderProveedores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores');
    res.render('proveedores', { proveedores: result.rows, usuario: req.user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Renderizar la página para agregar un nuevo proveedor
export const renderNuevoProveedor = (req, res) => {
  res.render('nuevoProveedor');
};

// Renderizar la página para editar un proveedor existente
export const renderEditarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM proveedores WHERE proveedor_id = $1', [id]);
    const proveedor = result.rows[0];
    res.render('editarProveedor', { proveedor });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo proveedor
export const crearProveedor = async (req, res) => {
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    await pool.query(
      'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5)',
      [nombre, contacto, telefono, email, direccion]
    );
    res.redirect('/proveedores');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un proveedor
export const actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    await pool.query(
      'UPDATE proveedores SET nombre = $1, contacto = $2, telefono = $3, email = $4, direccion = $5 WHERE proveedor_id = $6',
      [nombre, contacto, telefono, email, direccion, id]
    );
    res.redirect('/proveedores');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM proveedores WHERE proveedor_id = $1', [id]);
    res.redirect('/proveedores');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
