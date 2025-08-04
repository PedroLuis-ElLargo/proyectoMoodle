export async function cargarLogs() {
  try {
    const response = await fetch("http://localhost:3000/api/logs", {
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      // Aquí puedes crear dinámicamente elementos para mostrarlos en HTML si deseas
    } else {
      console.error("Error al obtener logs:", data.message);
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
}
