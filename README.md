# login-portada: Login/Signup y Tablero de Asignaturas - Aula Virtual UTEL

## 📂 Estructura del Proyecto

Estructura de carpetas del FRONT-END:

```bash
.
├── assets/
│ ├── css/
│ │ ├── dash.css
│ │ ├── header.css
│ │ └── style.css
│ └── img/
│ ├── logo/
│ │ ├── 1_claec.png
│ │ ├── 01_h_claec.png
│ │ └── CLAEC_ESCUDO_COLOR.png
│ ├── personas/
│ │ └── persona.png
│ └── anuncio.jfif
├── src/
│ ├── controllers/
│ │ └── animaciones.js
│ ├── services/
│ │ ├── login.js
│ │ └── index.js
│ └── views/
│ ├── dashboard.html
│ └── index.html
└── README.md
```

```bash
src/
├── controllers/
│   └── animaciones.js          # Efectos visuales y UI
├── services/
│   └── login.js                # Funciones de autenticación (fetch)
├── views/
│   └── formHandlers.js         # Manejadores de formularios
├── utils/
│   └── domHelpers.js           # Funciones utilitarias del DOM
├── index.js                    # Punto de entrada principal

```

Estructura de carpetas del BACK-END

```bash
backend/
├── server.js                 # Punto de entrada de la app
├── app.js                    # Configuración de middlewares y rutas
├── src/
│   ├── config/               # Archivos de configuración
│   ├── controllers/          # Controladores de la API
│   ├── middlewares/          # Middlewares personalizados
│   ├── routes/               # Rutas del API
│   ├── services/             # Lógica de negocio conectada a Moodle
│   └── utils/                # Utilidades comunes
├── .env                      # Variables de entorno de ejemplo
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto

```

## ⚙️ Archivos Principales

### server.js

Inicia el servidor en el puerto definido.

Carga variables de entorno desde .env.

Usa la app de Express definida en app.js.

### app.js

Configura middlewares esenciales: cors, body-parser, cookie-parser.

Carga y monta las rutas: autenticación, cursos y logs.

## 🧩 src/config/

### corsOptions.js

Define las políticas CORS para permitir acceso desde el frontend (incluye cookies en peticiones cross-origin).

### moodle.js

Contiene la URL base de Moodle, el servicio usado (moodle_mobile_app o servicio_estudiante) y el token de administrador.

## 🧠 src/controllers/

### auth.controller.js

login: Autentica con Moodle, genera JWT y lo almacena como cookie HttpOnly.

logout: Limpia la cookie de autenticación.

### course.controller.js

getUserCourses: Devuelve lista simplificada de cursos del usuario.

getCourseCompletion: Obtiene el estado general de finalización del curso.

getCourseContents: Lista los módulos del curso, filtrando solo la información útil.

### log.controller.js

getLogs: Devuelve los registros almacenados en logs/requests.json.

## 🛡️ src/middlewares/

### auth.middleware.js

isAuthenticated: Verifica que el JWT esté presente y sea válido. Adjunta el req.user con los datos del token.

## 🛣️ src/routes/

### auth.routes.js

POST /api/auth/login: Iniciar sesión.

POST /api/auth/logout: Cerrar sesión.

### course.routes.js

GET /api/moodle/courses: Cursos del usuario (requiere login).

GET /api/moodle/courses/:courseId/completion: Estado de finalización del curso.

GET /api/moodle/courses/:courseId/modules: Módulos del curso.

### log.routes.js

GET /api/logs: Retorna logs de peticiones (requiere login).

## 🧪 src/services/

### auth.service.js

authenticateUser: Obtiene el token de usuario desde login/token.php.

getMoodleUserIdByUsername (opcional): Recupera el ID de usuario Moodle por nombre si no viene incluido.

### course.service.js

getUserCourses: Llama a core_enrol_get_users_courses y simplifica la respuesta.

getCourseCompletionStatus: Llama a core_completion_get_activities_completion_status.

getCourseContents: Llama a core_course_get_contents y estructura un listado plano de módulos útiles para el frontend.

## 🧰 src/utils/

### apiClient.js

callMoodleApi: Construye URLs de Moodle, gestiona parámetros y errores.

### requestLogger.js

logRequestToFile: Registra detalles de peticiones importantes en logs/requests.json.

## 🔐 Seguridad y Autenticación

Se utilizan cookies HttpOnly para almacenar el JWT.

Las rutas protegidas requieren el middleware isAuthenticated.

Las interacciones con Moodle se hacen usando tokens de usuario y un token de administrador (almacenado en .env).

# Estructura de carpetas pruebas:

```
tests/
├── unit/
│   ├── controllers/
│   │   ├── auth.controller.test.js
│   │   ├── course.controller.test.js
│   │   └── log.controller.test.js
│   └── services/
│       ├── auth.service.test.js
│       ├── course.service.test.js
│       └── apiClient.test.js
├── integration/
│   ├── auth.routes.test.js
│   ├── course.routes.test.js
│   └── log.routes.test.js
└── security/
    ├── sqlInjection.test.js
    └── headers.test.js
```
