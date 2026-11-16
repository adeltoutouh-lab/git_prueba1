const app = require('./src/app');
const db = require('./src/db');

const PORT = process.env.PORT || 3000;

// Comprobamos que MySQL está conectado antes de arrancar.
db.query('SELECT 1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se ha podido conectar con MySQL:', error.message);
    process.exit(1);
  });
