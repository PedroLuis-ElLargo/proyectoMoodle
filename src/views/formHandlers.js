// src/views/formHandlers.js
import { loginUsuario } from "../services/login.js";

function mostrarMensaje(messageContainer, mensaje, color = "red") {
  messageContainer.style.color = color;
  messageContainer.textContent = mensaje;
}

export function manejarLoginEstudiante(form, messageContainer) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.querySelector('input[name="matricula"]').value.trim();
    const password = form.querySelector('input[name="contrasena"]').value;

    if (!username || !password) {
      mostrarMensaje(messageContainer, "Todos los campos son obligatorios.");
      return;
    }

    messageContainer.textContent = "";
    const { success, data, error } = await loginUsuario({ username, password });

    if (success) {
      mostrarMensaje(
        messageContainer,
        data.message || "Login exitoso.",
        "green"
      );
      window.location.href = "views/dashboard.html";
    } else {
      mostrarMensaje(
        messageContainer,
        data?.message || error || "Error desconocido al iniciar sesión."
      );
    }
  });
}

export function manejarLoginAdmin(form, messageContainer) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form
      .querySelector('input[name="usuarioAdmin"]')
      .value.trim();
    const password = form.querySelector('input[name="contrasenaAdmin"]').value;

    if (!username || !password) {
      mostrarMensaje(messageContainer, "Todos los campos son obligatorios.");
      return;
    }

    messageContainer.textContent = "";
    const { success, data, error } = await loginUsuario({ username, password });

    if (success) {
      mostrarMensaje(
        messageContainer,
        data.message || "Login exitoso.",
        "green"
      );
      // ELIMINAR: Ya no necesitamos guardar el adminUsername en localStorage aquí.
      // localStorage.setItem("adminUsername", data.username || username);
      window.location.href = "/admin-dashboard.html"; // Asume que tienes un dashboard para admin
    } else {
      mostrarMensaje(
        messageContainer,
        data?.message || error || "Error desconocido al iniciar sesión."
      );
    }
  });
}
