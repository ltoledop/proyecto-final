import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import indexRouter from './router/index.js'
import clientesRoutes from './router/clientesRoutes.js'
import productosRoutes  from './router/productosRoutes.js'
import usuariosRoutes  from './router/usuariosRoutes.js'; 
import categoriasRoutes  from './router/categoriaRoutes.js';
import proveedoresRoutes  from './router/proveedoresRoutes.js';

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
    res.redirect('/login');
  });

app.use(express.static(join(__dirname,'public')))
app.listen(3000)
console.log("El servidor está siendo escuchado en el puerto: ",3000)