// src/services/courseService.js

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchUserCourses() {
  try {
    const response = await fetch(`${API_BASE_URL}/moodle/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Importante para el envío de cookies
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 401 || response.status === 403) {
        // Si hay un error de autenticación/autorización, redirigir
        window.location.href = "../index.html";
      }
      throw new Error(
        data.message || `Error al obtener los cursos: ${response.statusText}`
      );
    }

    return data; // Contendrá username y courses
  } catch (error) {
    console.error("Error en fetchUserCourses:", error);
    throw error; // Propagar el error para que sea manejado en el dashboard.js
  }
}

export async function fetchCourseModules(courseId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/moodle/courses/${courseId}/modules`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `Error ${response.status}: No se pudo parsear el error.`,
      }));
      throw new Error(
        errorData.message ||
          `Error al obtener contenidos del curso (HTTP ${response.status}).`
      );
    }
    const data = await response.json();
    // Accede a 'data.contents' porque es la propiedad dentro de la respuesta
    // que contiene los datos que queremos, aunque el endpoint se llame /modules
    if (data.success && data.contents) {
      return data.contents; // Devuelve el array de secciones con módulos
    } else {
      throw new Error(
        data.message || "Respuesta de contenidos de curso inválida."
      );
    }
  } catch (error) {
    console.error("Error en fetchCourseModules:", error);
    throw error;
  }
}
