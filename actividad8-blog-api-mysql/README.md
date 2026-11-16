# Actividad 8: Diseño de API con base de datos MySQL

**Asignatura:** Full Stack Developer  
**Alumno:** Adel Toutouh El Bouchti

## 1. ¿Qué he hecho?

He creado una API sencilla para un blog utilizando Node.js, Express y MySQL. Tiene dos tablas: una para los autores y otra para los posts. Cada post está relacionado con un autor mediante una clave externa.

La API permite consultar y añadir autores y posts. También se pueden consultar los posts publicados por un autor en concreto. Cuando se obtiene un post, aparecen los datos del autor (nombre, email e imagen), no solo su ID.

## 2. Estructura del proyecto

```text
Actividad8_Blog_API_MySQL/
├── database/
│   └── blog_api.sql
├── src/
│   ├── routes/
│   │   ├── autores.js
│   │   └── posts.js
│   ├── app.js
│   ├── db.js
│   └── utils.js
├── .env.example
├── .gitignore
├── ejemplos.http
├── package.json
├── README.md
└── server.js
```

## 3. Cómo ponerlo en marcha

Necesitamos tener instalados **Node.js** y **MySQL**. Para crear la base de datos se puede usar MySQL Workbench.

**Paso 1: crear la base de datos**

1. Abre MySQL Workbench y entra en tu conexión local.
2. Ve a **File > Open SQL Script** y abre `database/blog_api.sql`.
3. Pulsa el botón del rayo para ejecutar todo el script.
4. Se creará la base de datos `blog_api`, las tablas `autores` y `posts` y varios registros de prueba.

**Aviso:** el archivo SQL elimina y vuelve a crear las tablas si ya existían. Es mejor usarlo en una base de datos de pruebas.

**Paso 2: configurar la conexión**

1. Abre la carpeta del proyecto en VS Code.
2. Copia el fichero `.env.example` y ponle de nombre `.env`.
3. En `.env`, modifica `DB_USER` y `DB_PASSWORD` con tus datos de MySQL. La base de datos debe llamarse `blog_api`.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contrasena
DB_NAME=blog_api
```

**Paso 3: instalar y arrancar**

Abre el terminal de VS Code en la carpeta del proyecto y ejecuta:

```bash
npm install
npm start
```

Si la conexión funciona, aparecerá:

```text
Servidor funcionando en http://localhost:3000
```

Podrás comprobar la API en `http://localhost:3000/api/autores` y `http://localhost:3000/api/posts`.

## 4. Rutas de la API

| Método | Ruta | Para qué sirve |
|---|---|---|
| GET | `/api/autores` | Ver todos los autores |
| GET | `/api/autores/:id` | Ver un autor por su ID |
| POST | `/api/autores` | Crear un autor |
| GET | `/api/posts` | Ver todos los posts junto con sus autores |
| GET | `/api/posts/:id` | Ver un post con los datos del autor |
| POST | `/api/posts` | Crear un post |
| GET | `/api/autores/:id/posts` | Ver los posts de un autor |

### Crear un autor

Enviar un `POST` a `http://localhost:3000/api/autores` con este JSON:

```json
{
  "nombre": "Lucía García",
  "email": "lucia@example.com",
  "imagen": "https://example.com/lucia.jpg"
}
```

### Crear un post

Enviar un `POST` a `http://localhost:3000/api/posts` con este JSON:

```json
{
  "titulo": "Un artículo nuevo",
  "descripcion": "Estoy probando la API con MySQL.",
  "categoria": "Tecnología",
  "autor_id": 1
}
```

La fecha de creación se guarda de forma automática en MySQL. El `autor_id` debe corresponder a un autor existente.

### Ver los posts de un autor

Por ejemplo, con `GET http://localhost:3000/api/autores/1/posts` se obtienen los posts cuyo autor tiene ID 1.

En el listado general, los posts se devuelven con este formato:

```json
{
  "id": 1,
  "titulo": "Mi primer post",
  "descripcion": "Este es el primer artículo del blog.",
  "fecha_creacion": "2026-11-16T19:30:00.000Z",
  "categoria": "General",
  "autor": {
    "id": 1,
    "nombre": "Ana López",
    "email": "ana.lopez@example.com",
    "imagen": "https://example.com/ana.jpg"
  }
}
```

La fecha del ejemplo es orientativa; la real será la fecha en la que se introduzca el post.

## 5. Cómo probarlo

Para las consultas GET se puede usar directamente el navegador. Para las peticiones POST se puede utilizar Postman o la extensión REST Client de VS Code. He incluido el fichero `ejemplos.http` para hacer pruebas más rápido con REST Client.

Algunas respuestas de error que devuelve la API:

- `400`: faltan datos o el ID no es válido.
- `404`: no se encuentra el autor o el post.
- `409`: el email del autor ya está registrado.
- `500`: ocurre un error interno de conexión o de servidor.

## 6. Archivos para la entrega

La entrega se realiza mediante un repositorio de GitHub, como indica el enunciado. Hay que subir los archivos del proyecto, incluido `database/blog_api.sql` y `.gitignore`, pero **no** la carpeta `node_modules` ni el archivo `.env` (contiene la contraseña de MySQL).

Si se necesita un **archivo SQL exportado directamente desde MySQL**, después de ejecutar el script hay que ir en Workbench a **Server > Data Export**, seleccionar `blog_api`, elegir la exportación a un único fichero SQL y pulsar **Start Export**. Ese fichero se puede incluir en el repositorio. El `blog_api.sql` incluido ya contiene las sentencias para recrear la estructura y los datos de prueba.

## 7. Conclusión

Con esta práctica he trabajado la creación de rutas con Express, las consultas SQL con Node.js y la relación entre tablas usando una clave externa. Lo más importante ha sido utilizar `JOIN` para que cada post devuelva la información completa de su autor.
