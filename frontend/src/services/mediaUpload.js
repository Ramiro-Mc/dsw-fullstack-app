// Subir imagen de curso
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
        url: data.imagenUrl || data.url
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

// Subir video de lección
export const subirVideoLeccion = async (file) => {
  const formData = new FormData();
  formData.append("video", file);

  try {
    const response = await fetch("http://localhost:3000/lecciones/upload-video", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.url
      };
    } else {
      throw new Error(data.msg || "Error al subir el video");
    }
  } catch (error) {
    console.error("Error al subir video:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Subir imagen de lección
export const subirImagenLeccion = async (file) => {
  const formData = new FormData();
  formData.append("imagen", file);

  try {
    const response = await fetch("http://localhost:3000/lecciones/upload-imagen", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.url
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

// Subir archivo de lección
export const subirArchivoLeccion = async (file) => {
  const formData = new FormData();
  formData.append("archivo", file);

  try {
    const response = await fetch("http://localhost:3000/lecciones/upload-archivo", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.url
      };
    } else {
      throw new Error(data.msg || "Error al subir el archivo");
    }
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return {
      success: false,
      error: error.message
    };
  }
};