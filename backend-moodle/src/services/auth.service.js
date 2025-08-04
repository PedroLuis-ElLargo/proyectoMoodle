// services/authService.js
const MOODLE_CONFIG = require("../config/moodle.js");
const { callMoodleApi } = require("../utils/apiClient.js");

/**
 * Intenta autenticar un usuario con Moodle.
 * @param {string} username - Nombre de usuario o matrícula.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<object>} Objeto con token de Moodle y ID de usuario si es exitoso.
 * @throws {Error} Si la autenticación falla.
 */
async function authenticateUser(username, password) {
  const tokenUrl = `${MOODLE_CONFIG.url}/login/token.php`;
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("service", MOODLE_CONFIG.authService);
  params.append("moodlewsrestformat", MOODLE_CONFIG.restFormat);

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (response.ok && data && data.token) {
      return {
        moodleUserToken: data.token,
        moodleUserId: data.userid,
      };
    } else {
      const errorMessage =
        data.error || "Credenciales inválidas. Por favor, inténtelo de nuevo.";
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene el ID de usuario de Moodle por nombre de usuario.
 * Útil si el endpoint de login no devuelve el ID directamente.
 * @param {string} username - Nombre de usuario de Moodle.
 * @returns {Promise<number>} El ID de usuario de Moodle.
 * @throws {Error} Si el usuario no es encontrado.
 */
async function getMoodleUserIdByUsername(username) {
  try {
    const users = await callMoodleApi("core_user_get_users_by_field", {
      field: "username",
      "values[0]": username,
    });

    if (users && users.length > 0) {
      return users[0].id;
    } else {
      throw new Error("Usuario Moodle no encontrado.");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { authenticateUser, getMoodleUserIdByUsername };
