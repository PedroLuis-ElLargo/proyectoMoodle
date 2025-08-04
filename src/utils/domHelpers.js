export function togglePasswordVisibility() {
  document.querySelectorAll(".show-password-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const formBox = checkbox.closest(".form-box");
      const input = formBox?.querySelector(".input-contrasena");
      if (input) input.type = checkbox.checked ? "text" : "password";
    });
  });
}

export function configurarCambioPaneles() {
  const container = document.querySelector(".container");
  const estudianteForm = container.querySelector(".form-box.estudiante");
  const adminForm = container.querySelector(".form-box.administracion");

  document
    .getElementById("link_acceso_admin")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      container.classList.add("admin-active");
      adminForm?.classList.add("visible");
      estudianteForm?.classList.remove("visible");
    });

  document
    .getElementById("link_acceso_estudiante")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      container.classList.remove("admin-active");
      estudianteForm?.classList.add("visible");
      adminForm?.classList.remove("visible");
    });
}
