// src/controllers/animaciones.js
export function iniciarAnimaciones() {
  document.querySelectorAll(".form-box").forEach((box) => {
    box.classList.add("fade-in");
  });
}
