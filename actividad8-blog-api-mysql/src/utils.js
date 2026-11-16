// Para comprobar que el ID recibido en la URL es un entero positivo.
function idValido(valor) {
  return /^[1-9]\d*$/.test(String(valor)) && Number.isSafeInteger(Number(valor));
}

function formatearPost(fila) {
  return {
    id: fila.id,
    titulo: fila.titulo,
    descripcion: fila.descripcion,
    fecha_creacion: fila.fecha_creacion,
    categoria: fila.categoria,
    autor: {
      id: fila.autor_id,
      nombre: fila.autor_nombre,
      email: fila.autor_email,
      imagen: fila.autor_imagen
    }
  };
}

// Así no tenemos que repetir todas las columnas en cada consulta.
const consultaPosts = `
  SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
         a.id AS autor_id, a.nombre AS autor_nombre,
         a.email AS autor_email, a.imagen AS autor_imagen
  FROM posts p
  INNER JOIN autores a ON p.autor_id = a.id
`;

module.exports = { idValido, formatearPost, consultaPosts };
