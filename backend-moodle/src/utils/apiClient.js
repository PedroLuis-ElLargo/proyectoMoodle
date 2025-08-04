// utils/apiClient.js
const MOODLE_CONFIG = require("../config/moodle");

/**
 * Realiza una llamada a la API de Moodle.
 * @param {string} wsfunction - El nombre de la función de servicio web de Moodle.
 * @param {object} params - Los parámetros para la función de Moodle.
 * @param {string} [token=MOODLE_CONFIG.adminToken] - El token de autenticación (admin o de usuario).
 * @returns {Promise<object>} La respuesta de la API de Moodle.
 */
async function callMoodleApi(
  wsfunction,
  params,
  token = MOODLE_CONFIG.adminToken
) {
  const apiUrl = `${MOODLE_CONFIG.url}/webservice/rest/server.php`;
  const queryParams = new URLSearchParams({
    wstoken: token,
    wsfunction: wsfunction,
    moodlewsrestformat: MOODLE_CONFIG.restFormat,
    ...params,
  });

  try {
    const response = await fetch(`${apiUrl}?${queryParams.toString()}`);
    const data = await response.json();

    if (data.exception) {
      throw new Error(data.message || "Error desconocido de Moodle API");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { callMoodleApi };
