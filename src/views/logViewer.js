export async function cargarLogs() {
  try {
    const response = await fetch(`${config.API_BASE_URL}/logs`, {
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
    } else {
      console.error("Error al obtener logs:", data.message);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
