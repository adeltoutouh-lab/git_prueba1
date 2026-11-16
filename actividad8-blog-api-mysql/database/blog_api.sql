-- Actividad 8 - Diseño de API con base de datos MySQL
-- Base de datos del blog con las tablas autores y posts.
-- Este archivo también añade unos registros para hacer pruebas.
-- IMPORTANTE: al ejecutarlo se recrean las dos tablas y se borran sus datos anteriores.

CREATE DATABASE IF NOT EXISTS blog_api
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE blog_api;

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS autores;

CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  imagen VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoria VARCHAR(100) NOT NULL,
  autor_id INT NOT NULL,
  CONSTRAINT fk_posts_autores FOREIGN KEY (autor_id)
    REFERENCES autores(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Datos de ejemplo.
INSERT INTO autores (nombre, email, imagen) VALUES
('Ana López', 'ana.lopez@example.com', 'https://example.com/ana.jpg'),
('Carlos Martín', 'carlos.martin@example.com', 'https://example.com/carlos.jpg');

INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES
('Mi primer post', 'Este es el primer artículo del blog.', 'General', 1),
('Aprendiendo Express', 'Una pequeña introducción a las rutas de Express.', 'Programación', 1),
('Consultas en MySQL', 'Ejemplo de uso de bases de datos en una API.', 'Bases de datos', 2);
