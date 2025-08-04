// src/services/authService.js

const API_BASE_URL = "http://localhost:3000/api";

export async function logoutUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error de red al cerrar sesión:", error);
    alert(
      "Ocurrió un error de conexión al intentar cerrar sesión. Por favor, verifica tu conexión a internet."
    );
    return false;
  }
}
