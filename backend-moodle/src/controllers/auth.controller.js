// controllers/auth.controller.js
const authService = require("../services/auth.service.js");
const jwt = require("jsonwebtoken");
const { logRequestToFile } = require("../utils/requestLogger");

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h";

const isProd = process.env.NODE_ENV === "production";

/**
 * Maneja la solicitud de login.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Usuario y contraseña son requeridos.",
    });
  }

  try {
    const authResult = await authService.authenticateUser(username, password);
    let moodleUserId = authResult.moodleUserId;

    if (!moodleUserId) {
      try {
        moodleUserId = await authService.getMoodleUserIdByUsername(username);
      } catch (userError) {
        return res.status(500).json({
          success: false,
          message:
            "Login exitoso, pero no se pudo obtener el ID del usuario en Moodle: " +
            userError.message,
        });
      }
    }

    const token = jwt.sign({ moodleUserId, username }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Registrar en JSON
    logRequestToFile("/api/auth/login", username, {
      message: "Login exitoso",
      moodleUserId: moodleUserId,
    });

    res.status(200).json({ success: true, message: "Login exitoso." });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message || "Credenciales inválidas.",
    });
  }
}

/**
 * Maneja la solicitud de logout.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
function logout(req, res) {
  const cookies = req.headers.cookie;
  let username = "Unknown";

  if (cookies) {
    const token = cookies
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        username = decoded.username;
      } catch (err) {}
    }
  }

  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    path: "/",
  });

  logRequestToFile("/api/auth/logout", username, {
    message: "Sesión cerrada correctamente.",
  });

  res
    .status(200)
    .json({ success: true, message: "Sesión cerrada correctamente." });
}

// Agregar al final del archivo existente:

/**
 * Maneja logout iniciado desde Moodle
 */
async function moodleLogout(req, res) {
  const { username, token } = req.body;

  try {
    // Log del logout desde Moodle
    logRequestToFile("/api/auth/moodle-logout", username, {
      message: "Logout iniciado desde Moodle",
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: "Logout registrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error procesando logout: " + error.message,
    });
  }
}

/**
 * Verifica estado de sesión
 */
async function checkSessionStatus(req, res) {
  const userId = req.user.moodleUserId;
  const username = req.user.username;

  try {
    // Verificar si el token sigue válido en Moodle (opcional)
    // await callMoodleApi("core_webservice_get_site_info", {}, req.user.moodleToken);

    res.json({
      success: true,
      sessionValid: true,
      user: {
        username: username,
        moodleUserId: userId,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      sessionValid: false,
      message: "Sesión expirada en Moodle",
    });
  }
}

module.exports = { login, logout, moodleLogout, checkSessionStatus };
