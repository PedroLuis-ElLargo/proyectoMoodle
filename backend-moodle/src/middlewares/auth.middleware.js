// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

function isAuthenticated(req, res, next) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No autenticado. Token JWT no proporcionado en la cookie.",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message:
          "Token inválido o expirado. Por favor, inicie sesión de nuevo.",
      });
    }

    req.user = user;

    next();
  });
}

module.exports = { isAuthenticated };
