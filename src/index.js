import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import indexRouter from './router/index.js'
import clientesRoutes from './router/clientesRoutes.js'; // Router de usuarios
import productosRoutes  from './router/productosRoutes.js'; // Router de usuarios
import usuariosRoutes  from './router/usuariosRoutes.js'; // Router de usuarios
import categoriasRoutes  from './router/categoriaRoutes.js'; // Router de usuarios
import proveedoresRoutes  from './router/proveedoresRoutes.js'; // Router de usuarios
const app= express()

import dotenv from 'dotenv';

dotenv.config();

const __dirname= dirname(fileURLToPath(import.meta.url))
console.log(join(__dirname , 'views'))
app.set('views', join(__dirname,'views'))
app.use(indexRouter)

app.set('view engine', 'ejs')

app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/uploads', express.static('src/uploads'));

// Ruta para mostrar el login
app.get('/login', (req, res) => res.render('login',{title: 'Iniciar Sesión'}))

  
app.get('/logout', (req, res) => {
    // Aquí deberías eliminar el token o la sesión del usuario
    res.redirect('/login');
  });

app.use(express.static(join(__dirname,'public')))
app.listen(3000)
console.log("El servidor está siendo escuchado en el puerto: ",3000)