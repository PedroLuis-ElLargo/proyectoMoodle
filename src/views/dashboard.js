// src/views/dashboard.js

import { createCourseCard } from "../utils/domManipulations.js";
import {
  showLoading,
  hideLoading,
  showNoCourses,
  showErrorMessage,
  setUserName,
} from "../utils/uiMessages.js";
import {
  fetchUserCourses,
  fetchCourseModules,
} from "../services/courseService.js";
import { logoutUser } from "../services/authService.js";

// La función principal del dashboard
export function inicializarDashboard() {
  // Escucha el evento DOMContentLoaded para asegurar que el HTML esté cargado
  document.addEventListener("DOMContentLoaded", async () => {
    const logoutButton = document.getElementById("logoutButton");
    const coursesGridContainer = document.getElementById(
      "coursesGridContainer"
    );

    // Verificación inicial del contenedor de cursos
    if (!coursesGridContainer) {
      console.error(
        "El contenedor de cursos (#coursesGridContainer) no se encontró en el DOM."
      );
      showErrorMessage("Error interno: Contenedor de cursos no disponible.");
      return; // Detener la ejecución si el contenedor no existe
    }

    // Función asíncrona para cargar y mostrar los cursos y sus módulos
    async function loadAndDisplayCourses() {
      showLoading(); // Muestra el mensaje de "Cargando..."
      coursesGridContainer.innerHTML = ""; // Limpia el contenedor antes de añadir nuevos cursos

      try {
        // 1. Obtener la lista de cursos del usuario
        const data = await fetchUserCourses(); // data = { success: true, username: "...", courses: [...] }
        hideLoading(); // Oculta el mensaje de carga

        // 2. Establecer el nombre de usuario
        setUserName(data.username);

        // 3. Procesar y mostrar los cursos si existen
        if (data.courses?.length > 0) {
          for (const course of data.courses) {
            let contents = []; // <-- Cambiado de 'modules' a 'contents'
            try {
              // 4. Para cada curso, obtener sus contenidos/módulos específicos
              // fetchCourseModules ahora devuelve el array 'contents' directamente
              const contentsResponse = await fetchCourseModules(course.id);
              contents = contentsResponse; // <-- Ahora asignamos la respuesta directamente, ya que fetchCourseModules devuelve el array de contenidos
            } catch (moduleError) {
              console.error(
                `Error de red o servidor al cargar contenidos para el curso ${course.id}:`, // Mensaje actualizado
                moduleError
              );
              // También aquí, contents seguirá siendo []
            }

            // 5. Crear y añadir la tarjeta del curso con sus contenidos
            const courseCard = createCourseCard(course, contents); // <-- Pasamos 'contents'
            coursesGridContainer.appendChild(courseCard);
          }
        } else {
          showNoCourses(); // Muestra el mensaje de "No hay cursos disponibles"
        }
      } catch (error) {
        hideLoading(); // Oculta el mensaje de carga en caso de error
        const errorMessage = error.message.includes(
          "Error al obtener los cursos"
        )
          ? error.message
          : "Error de conexión al cargar asignaturas. Inténtalo de nuevo más tarde.";
        showErrorMessage(errorMessage);
      }
    }

    await loadAndDisplayCourses();

    // Configurar el botón de cerrar sesión
    logoutButton?.addEventListener("click", async () => {
      const success = await logoutUser();
      if (success) {
        window.location.href = "../../index.html";
      } else {
        alert("Fallo al cerrar sesión. Por favor, inténtalo de nuevo.");
      }
    });
  });
}
