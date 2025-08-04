const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "./data");
const LOG_FILE = path.join(DATA_DIR, "requests.json");

/**
 * Asegura que el directorio y archivo existan antes de escribir logs
 */
function ensureLogFileExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, "[]", "utf8");
  }
}

/**
 * Registra una solicitud en el archivo requests.json
 * @param {string} endpoint - Ruta de la API que fue solicitada
 * @param {string} username - Usuario que hizo la solicitud
 * @param {object} payload - Datos devueltos por esa solicitud
 */
function logRequestToFile(endpoint, username, payload) {
  ensureLogFileExists();

  let logData = [];

  try {
    const fileContent = fs.readFileSync(LOG_FILE, "utf8");
    logData = JSON.parse(fileContent);
  } catch (err) {
    console.error("Error leyendo el archivo JSON de log:", err.message);
  }

  const entry = {
    timestamp: new Date().toISOString(),
    endpoint,
    username,
    payload,
  };

  logData.push(entry);

  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logData, null, 2), "utf8");
  } catch (err) {}
}

module.exports = { logRequestToFile };
