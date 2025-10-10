import '../../component-styles/Contenido.css'

function Contenido({ claseClicked }) {
    console.log("=== DEBUG CONTENIDO ===");
    console.log("claseClicked completo:", claseClicked);
    console.log("claseClicked.videoLeccion:", claseClicked.videoLeccion);
    console.log("claseClicked.imagenUrl:", claseClicked.imagenUrl);
    console.log("claseClicked.archivoUrl:", claseClicked.archivoUrl);
    console.log("Tipo de videoLeccion:", typeof claseClicked.videoLeccion);

    const getVideoEmbedUrl = (url) => {
   
        if (!url) {
            return '';
        }
        
        // Si ya es una URL de embed de YouTube
        if (url.includes('youtube.com/embed/')) {
            return url;
        }
        
        // Si es una URL normal de YouTube
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
                return embedUrl;
            }
        }
        
        // Si es una URL corta de YouTube
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
                return embedUrl;
            }
        }

        // Si no es una URL reconocida,
        return '';
    };

    const videoUrl = getVideoEmbedUrl(claseClicked.videoLeccion);
    console.log("URL final para iframe:", videoUrl);

    return (
        <div className="cont-principal">
            {/* 1. Título y descripción de la lección */}
            <div className="leccion-header">
                <h2>{claseClicked.tituloLeccion}</h2>
                {claseClicked.descripcion && (
                    <p className="descripcion-leccion">{claseClicked.descripcion}</p>
                )}
            </div>
            
            <hr/>
            
            {/* 2. Contenido de texto */}
            {claseClicked.contenido && (
                <div className="contenido-texto">
                    <p>{claseClicked.contenido}</p>
                </div>
            )}
            
            {/* 3. Video */}
            {claseClicked.videoLeccion && (
                <div className="contenedor-video">
                    <h3>Video de la lección:</h3>
                    {videoUrl ? (
                        <iframe 
                            className="video"
                            width="560" 
                            height="315" 
                            src={videoUrl}
                            title={claseClicked.tituloLeccion} 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            loading="lazy"
                            onLoad={() => console.log(" Iframe cargado correctamente")}
                            onError={(e) => console.error(" Error en iframe:", e)}
                        />
                    ) : (
                        <div className="video-placeholder">
                            <p>Video no disponible</p>
                            <small>URL original: {claseClicked.videoLeccion || 'undefined'}</small>
                            <br />
                            <small>URL procesada: {videoUrl || 'vacía'}</small>
                        </div>
                    )}
                </div>
            )}
            
            {/* 4. Imágenes y archivos */}
            <div className="recursos-adicionales">
                {claseClicked.imagenUrl && (
                    <div className="contenedor-imagen">
                        <h3>Archvios e Imagenes adicionales:</h3>
                        <img 
                            src={claseClicked.imagenUrl} 
                            alt={`Imagen de ${claseClicked.tituloLeccion}`}
                            className="imagen-leccion"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                console.error("Error al cargar imagen:", claseClicked.imagenUrl);
                            }}
                        />
                    </div>
                )}
                
                {claseClicked.archivoUrl && (
                    <div className="contenedor-archivo">
                        <a 
                            href={claseClicked.archivoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="enlace-archivo"
                        >
                            Abrir archivo
                        </a>
                    </div>
                )}
                
                {/* Mostrar sección vacía para debug */}
                {!claseClicked.imagenUrl && !claseClicked.archivoUrl && (
                    <div style={{color: '#999', fontStyle: 'italic'}}>
                        No hay recursos adicionales (imágenes o archivos) para esta lección.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contenido;