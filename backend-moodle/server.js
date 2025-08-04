// server.js
const app = require("./src/app.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT);
