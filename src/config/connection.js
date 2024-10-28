// src/config/connection.js
import pkg from 'pg'; // Importa el paquete completo
const { Pool } = pkg; // Extrae 'Pool' del paquete

import dotenv from 'dotenv'; // Importa dotenv
dotenv.config(); // Carga las variables de entorno

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


pool.connect((err) => {
  if (err) {
      console.error('Error al conectar a la base de datos', err);
  } else {
      console.log('Conexión a la base de datos exitosa');
  }
});

export default pool; // Exporta la conexión
