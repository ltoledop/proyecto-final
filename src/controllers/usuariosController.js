import pool from '../config/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'mi_secreto'; 

export const registerUsuario  = async (req, res) => {
  const { nombre_cliente, email_cliente, telefono, direccion, ciudad, pais, nombre_usuario, contrasena, rol, email } = req.body;

  try {
    const clienteResult = await pool.query(
      `INSERT INTO clientes (nombre, email, telefono, direccion, ciudad, pais)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING cliente_id`,
      [nombre_cliente, email_cliente, telefono, direccion, ciudad, pais]
    );
    const cliente_id = clienteResult.rows[0].cliente_id;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar datos en la tabla 'usuarios'
    const usuarioResult = await pool.query(
      `INSERT INTO usuarios (nombre_usuario, contrasena, rol, email)
       VALUES ($1, $2, $3, $4) RETURNING usuario_id`,
      [nombre_usuario, hashedPassword, rol, email]
    );
    const usuario_id = usuarioResult.rows[0].usuario_id;

    await pool.query(
      `INSERT INTO clientes_usuarios (cliente_id, usuario_id)
       VALUES ($1, $2)`,
      [cliente_id, usuario_id]
    );
    res.status(201).redirect('/usuarios/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar el usuario y cliente.');
  }
};

export const loginUsuario = async (req, res) => {
  const nombre_usuario = 'admin';
  const contrasena = 'admin';
  console.log("nombre_usuario:", nombre_usuario);
  console.log("contrasena:", contrasena);
  try {
      const result = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = $1', [nombre_usuario]);
      console.log("result",result)
      if (result.rows.length === 0) return res.status(400).send('Usuario no encontrado');

      const usuario = result.rows[0];
      const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!validPassword) return res.status(400).send('Contraseña incorrecta');

      req.user = {
          usuario_id: usuario.usuario_id,
          nombre_usuario: usuario.nombre_usuario,
          rol: usuario.rol
      };

      // Ahora redirigimos al dashboard
      renderDashboard(req, res);
  } catch (error) {
      res.status(500).send(error.message);
  }
};



export const renderUsuarios  = async (req, res) => {
  const usuario = req.user; 
  console.log(usuario)
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.render('usuarios', { usuarios: result.rows, usuario }); 
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderDashboard = async (req, res) => {
  console.log("ingresando");
  const usuario = req.user;
  res.render('dashboard', { usuario });
};