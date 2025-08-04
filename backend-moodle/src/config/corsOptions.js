// src/config/corsOptions.js
require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";
const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(
        new Error(`No permitido por CORS. Origen no autorizado: ${origin}`)
      );
    }
  },

  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
