
import pool from '../config/connection.js';
import bcrypt from 'bcrypt';

export const getClientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createCliente  = async (req, res) => {
  const { nombre, email, telefono, direccion, ciudad, pais } = req.body;
  try {
      const result = await pool.query(
          `INSERT INTO clientes (nombre, email, telefono, direccion, ciudad, pais) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [nombre, email, telefono, direccion, ciudad, pais]
      );
      res.status(201).json(result.rows[0]);
  } catch (error) {
      res.status(500).send(error.message);
  }
};
