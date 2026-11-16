const express = require('express');
const rutasAutores = require('./routes/autores');
const rutasPosts = require('./routes/posts');

const app = express();

// Permite recibir los datos enviados en formato JSON.
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API del blog. Prueba las rutas /api/autores y /api/posts' });
});

app.use('/api/autores', rutasAutores);
app.use('/api/posts', rutasPosts);

app.use((req, res) => {
  res.status(404).json({ error: 'La ruta solicitada no existe' });
});

// Errores de la base de datos y del servidor.
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Ya existe un autor con ese email' });
  }

  res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
});

module.exports = app;
