// src/services/login.js
export async function loginUsuario({ username, password }) {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const data = await response.json();

    return { success: response.ok, data };
  } catch (error) {
    console.error("Error al conectar con el backend en loginUsuario:", error);
    return {
      success: false,
      data: {
        message: "Error de conexión con el servidor. Inténtalo más tarde.",
      },
      error,
    };
  }
}
