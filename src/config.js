// src/config.js
// Configuración de la aplicación para diferentes entornos

const dev = {
  API_BASE_URL: "http://localhost:3000/api",
  MOODLE_BASE_URL: "http://127.0.0.1",
};

const prod = {
  API_BASE_URL: "https://tudominio.com/api",

  MOODLE_BASE_URL: "https://tudominio.com",
};

const env = "development";

export const config = env === "development" ? dev : prod;
