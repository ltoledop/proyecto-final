
import pool from '../config/connection.js';

export const renderCategorias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    console.log(result.rows)
    res.render('categorias', { categorias: result.rows, usuario: req.user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderNuevaCategoria = (req, res) => {
  res.render('nuevaCategoria');
};

export const renderEditarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categorias WHERE categoria_id = $1', [id]);
    const categoria = result.rows[0];
    res.render('editarCategoria', { categoria });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const crearCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await pool.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2)',
      [nombre, descripcion]
    );
    res.redirect('/categorias');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await pool.query(
      'UPDATE categorias SET nombre = $1, descripcion = $2 WHERE categoria_id = $3',
      [nombre, descripcion, id]
    );
    res.redirect('/categorias');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categorias WHERE categoria_id = $1', [id]);
    res.redirect('/categorias');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
