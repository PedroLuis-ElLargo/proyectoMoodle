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

  let sectionsTimelineHtml = ""; // Contendrá los bloques de sección
  if (sections.length > 0) {
    sections.forEach((section, index) => {
      const sectionNumber = index + 1; // Para la numeración en el círculo
      const sectionDisplayName = section.name; // Nombre de la sección (ej. "General", "Tema 1")

      // Por ahora, no hay lógica de completado o actual con la info del backend.
      // Usamos 'current' si es la primera sección para simular el ejemplo de la imagen.
      // Puedes ajustar esta lógica si tu backend te da el estado "completado" o "actual".
      let weekClasses = "week";
      if (index === 0) {
        // Ejemplo: si es el primer elemento, lo marcamos como 'completed' y 'current' para que se vea verde y azul.
        weekClasses += " completed current"; // Para tener el tick verde y el color azul base.
      } else if (index === 1) {
        // Ejemplo: el segundo como 'current'
        weekClasses += " current";
      } else {
        weekClasses += " unavailable"; // Los demás como 'unavailable'
      }

      sectionsTimelineHtml += `
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

  // El botón "IR A LA ASIGNATURA"
  const goToCourseBtn = card.querySelector(".btn-primary");
  goToCourseBtn.addEventListener("click", () => {
    if (course.viewurl) {
      window.open(course.viewurl, "_blank");
    } else {
      console.warn(
        `URL de vista de curso no disponible para el curso ID: ${courseId}`
      );
    }
  });

  return card;
}
