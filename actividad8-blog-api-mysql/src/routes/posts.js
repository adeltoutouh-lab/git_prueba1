const express = require('express');
const db = require('../db');
const { idValido, consultaPosts, formatearPost } = require('../utils');

const router = express.Router();

// GET /api/posts - Listado de posts, cada uno con los datos del autor.
router.get('/', async (req, res, next) => {
  try {
    const [posts] = await db.execute(
      `${consultaPosts} ORDER BY p.fecha_creacion DESC, p.id DESC`
    );
    res.json(posts.map(formatearPost));
  } catch (error) {
    next(error);
  }
});

// GET /api/posts/:id - Un post concreto con su autor.
router.get('/:id', async (req, res, next) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El ID no es válido' });
  }

  try {
    const [posts] = await db.execute(`${consultaPosts} WHERE p.id = ?`, [req.params.id]);

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.json(formatearPost(posts[0]));
  } catch (error) {
    next(error);
  }
});

// POST /api/posts - Crear post indicando el ID de un autor existente.
router.post('/', async (req, res, next) => {
  const { titulo, descripcion, categoria, autor_id } = req.body || {};

  if (typeof titulo !== 'string' || !titulo.trim() ||
      typeof descripcion !== 'string' || !descripcion.trim() ||
      typeof categoria !== 'string' || !categoria.trim() || !idValido(autor_id)) {
    return res.status(400).json({ error: 'Faltan datos o el autor_id no es válido' });
  }

  try {
    const [autores] = await db.execute('SELECT id FROM autores WHERE id = ?', [autor_id]);

    if (autores.length === 0) {
      return res.status(404).json({ error: 'No existe el autor indicado' });
    }

    const [resultado] = await db.execute(
      'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
      [titulo.trim(), descripcion.trim(), categoria.trim(), autor_id]
    );

    const [posts] = await db.execute(`${consultaPosts} WHERE p.id = ?`, [resultado.insertId]);
    res.status(201).json(formatearPost(posts[0]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
