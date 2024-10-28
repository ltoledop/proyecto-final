// src/controllers/productosController.js
import pool from '../config/connection.js';

export const renderProductos = async (req, res) => {
  try {
    const productos = await pool.query(`
      SELECT productos.producto_id, productos.nombre, productos.descripcion, productos.precio, productos.stock,
             proveedores.nombre AS proveedor_nombre, productos.proveedor_id, productos.categoria_id, categorias.nombre AS categoria_nombre
      FROM productos
      LEFT JOIN categorias ON productos.categoria_id = categorias.categoria_id
      LEFT JOIN proveedores ON productos.proveedor_id = proveedores.proveedor_id
      WHERE productos.state = 1
    `);
    res.render('productos', { productos: productos.rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderNuevoProducto = async (req, res) => {
  try {
    const categorias = await pool.query('SELECT * FROM categorias');
    const proveedores = await pool.query('SELECT * FROM proveedores');
    
    res.render('nuevoProducto', { categorias: categorias.rows, proveedores: proveedores.rows });
 } catch (error) {
    res.status(500).send(error.message);
  }
};

export const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, proveedor_id, categoria_id } = req.body;
  const imagen_url = req.file ? `./src/uploads/${req.file.filename}` : null; // Verifica si se ha subido una imagen
  
  try {
    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, proveedor_id, categoria_id, imagen_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [nombre, descripcion, precio, stock, proveedor_id, categoria_id, imagen_url]
    );
    res.redirect('/productos');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderEditarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await pool.query('SELECT * FROM productos WHERE producto_id = $1', [id]);
    console.log("producto",producto.rows[0])
    const categorias = await pool.query('SELECT * FROM categorias');
    const proveedores = await pool.query('SELECT * FROM proveedores');
    res.render('editarProducto', {
      producto: producto.rows[0],
      categorias: categorias.rows,
      proveedores: proveedores.rows
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

  export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, proveedor_id, categoria_id } = req.body;
    console.log("ingresando22",req.body)
    const imagen_url = req.file ? `/uploads/${req.file.filename}` : req.body.imagen_actual; // Usa la imagen nueva si se sube
  
    try {
      await pool.query(
        'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, proveedor_id = $5, categoria_id = $6, imagen_url = $7 WHERE producto_id = $8',
        [nombre, descripcion, precio, stock, proveedor_id, categoria_id, imagen_url, id]
      );
      res.redirect('/productos');
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE productos SET state = 0 WHERE producto_id = $1', [id]);
    
    const result = await pool.query('SELECT * FROM productos WHERE state = 1');
    
    res.render('productos', { productos: result.rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
};