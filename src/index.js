// src/index.js
import { iniciarAnimaciones } from "./controllers/animaciones.js";
import {
  manejarLoginEstudiante,
  manejarLoginAdmin,
} from "./views/formHandlers.js";
import {
  togglePasswordVisibility,
  configurarCambioPaneles,
} from "./utils/domHelpers.js";

document.addEventListener("DOMContentLoaded", () => {
  const estudianteForm = document.getElementById("estudianteLoginForm");
  const adminForm = document.getElementById("adminLoginForm");

  if (estudianteForm) {
    manejarLoginEstudiante(
      estudianteForm,
      document.getElementById("estudianteLoginMessage")
    );
  }

  if (adminForm) {
    manejarLoginAdmin(adminForm, document.getElementById("adminLoginMessage"));
  }

  togglePasswordVisibility();
  configurarCambioPaneles();
  iniciarAnimaciones();
});
