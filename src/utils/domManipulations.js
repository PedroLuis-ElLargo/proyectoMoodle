// src/utils/domManipulations.js

/**
 * Crea un elemento de tarjeta de curso HTML a partir de los datos del curso.
 * @param {Object} course - Objeto con la información del curso de Moodle.
 * @param {Array} sections - Array de objetos de sección (cada una con id, name, moduleCount).
 * @returns {HTMLElement} El elemento div de la tarjeta de curso.
 */
export function createCourseCard(course, sections = []) {
  const card = document.createElement("div");
  card.classList.add("course-card");
  card.setAttribute("data-course-id", course.id);

  const courseName = course.fullname || "Curso Desconocido";
  const courseId = course.id;

  let sectionsTimelineHtml = "";
  if (sections.length > 0) {
    sections.forEach((section, index) => {
      const sectionNumber = index + 1;
      const sectionDisplayName = section.name;
      const sectionUrl = section.viewurl;

      let weekClasses = "week";
      if (index === 0) {
        weekClasses += " completed current";
      } else if (index === 1) {
        weekClasses += " current";
      } else {
        weekClasses += " unavailable";
      }

      sectionsTimelineHtml += `
      <a href="${sectionUrl}" class="timeline-link" data-url="${sectionUrl}" title="Ir a ${
        section.name
      }">
        <div class="${weekClasses}">
          <div class="week-number">
            <span>${sectionNumber}</span>
          </div>
          <p class="week-dates">${sectionDisplayName}</p>
          ${
            section.moduleCount > 0
              ? `<div class="module-icon-placeholder">📦</div>`
              : ""
          } ${index === 0 ? `<div class="completion-check">✔</div>` : ""} </div>
      `;
    });
  } else {
    sectionsTimelineHtml = `<p class="no-modules-message">No hay secciones o contenidos disponibles para este curso.</p>`;
  }

  card.innerHTML = `
    <div class="card-header">
      <h3 class="course-title">${courseName}</h3>
      <p class="course-subtitle">ID Moodle: ${courseId}</p> </div>
    <div class="card-body">
      <h4 class="section-title">Módulos</h4> <div class="timeline">
          ${sectionsTimelineHtml}
      </div>
      <div class="course-actions">
        <button class="btn btn-primary" data-course-id="${courseId}">IR A LA ASIGNATURA</button>
        <div class="grade-info">
          <p class="grade-label">Calificación obtenida al momento</p>
          <p class="grade-value">N/A</p> </div>
      </div>
    </div>
  `;

  // Agregar el evento de clic al enlace de la sección
  card.querySelectorAll(".timeline-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Evitamos que el enlace navegue de forma normal
      const url = link.dataset.url;
      if (url) {
        window.open(url, "moodle_window"); // Usamos el MISMO nombre de ventana
      }
    });
  });

  // El botón "IR A LA ASIGNATURA"
  const goToCourseBtn = card.querySelector(".btn-primary");
  goToCourseBtn.addEventListener("click", () => {
    if (course.viewurl) {
      window.open(course.viewurl, "moodle_window");
    } else {
      console.warn(
        `URL de vista de curso no disponible para el curso ID: ${courseId}`
      );
    }
  });

  return card;
}
