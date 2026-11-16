const express = require('express');
const db = require('../db');
const { idValido, consultaPosts, formatearPost } = require('../utils');

const router = express.Router();

// GET /api/autores - Listado de autores.
router.get('/', async (req, res, next) => {
  try {
    const [autores] = await db.execute('SELECT * FROM autores ORDER BY id');
    res.json(autores);
  } catch (error) {
    next(error);
  }
});

// GET /api/autores/:id - Datos de un autor.
router.get('/:id', async (req, res, next) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El ID no es válido' });
  }

  try {
    const [autores] = await db.execute('SELECT * FROM autores WHERE id = ?', [req.params.id]);

    if (autores.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    res.json(autores[0]);
  } catch (error) {
    next(error);
  }
});

// GET /api/autores/:id/posts - Posts escritos por ese autor.
router.get('/:id/posts', async (req, res, next) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'El ID no es válido' });
  }

  try {
    const [autores] = await db.execute('SELECT id FROM autores WHERE id = ?', [req.params.id]);

    if (autores.length === 0) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }

    const [posts] = await db.execute(
      `${consultaPosts} WHERE p.autor_id = ? ORDER BY p.fecha_creacion DESC, p.id DESC`,
      [req.params.id]
    );

    res.json(posts.map(formatearPost));
  } catch (error) {
    next(error);
  }
});

// POST /api/autores - Crear un autor.
router.post('/', async (req, res, next) => {
  const { nombre, email, imagen } = req.body || {};

  if (typeof nombre !== 'string' || !nombre.trim() ||
      typeof email !== 'string' || !email.includes('@') ||
      (imagen !== undefined && imagen !== null && typeof imagen !== 'string')) {
    return res.status(400).json({ error: 'Revisa el nombre, email e imagen del autor' });
  }

  try {
    const [resultado] = await db.execute(
      'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
      [nombre.trim(), email.trim(), imagen ? imagen.trim() : null]
    );

    const [autores] = await db.execute('SELECT * FROM autores WHERE id = ?', [resultado.insertId]);
    res.status(201).json(autores[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
