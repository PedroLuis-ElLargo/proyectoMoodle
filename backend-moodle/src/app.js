// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importar configuraciones
const corsOptions = require("./config/corsOptions.js");

// Importar rutas
const authRoutes = require("./routes/auth.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const logRoutes = require("./routes/log.routes.js");
const ssoRoutes = require("./routes/sso.routes.js");

const app = express();

// Middlewares globales
app.use(cors(corsOptions)); // 1. CORS primero
app.use(bodyParser.json()); // 2. Parser de JSON
app.use(cookieParser()); // 3. Parser de cookies

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/moodle", courseRoutes);
app.use("/api", logRoutes);
app.use("/api/sso", ssoRoutes);

// Ruta de prueba (opcional)
app.get("/", (req, res) => {
  res.send("Backend de Moodle funcionando y listo para recibir solicitudes!");
});

module.exports = app;
