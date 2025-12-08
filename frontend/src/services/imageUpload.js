export const subirImagenCurso = async (file) => {
  const formData = new FormData();
  formData.append("imagenCurso", file);

  try {
    const response = await fetch("http://localhost:3000/nuevosCursos/upload-imagen", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.imagenUrl
      };
    } else {
      throw new Error(data.msg || "Error al subir la imagen");
    }
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return {
      success: false,
      error: error.message
    };
  }
};