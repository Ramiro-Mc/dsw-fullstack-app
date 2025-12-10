import '../../component-styles/Contenido.css'

function Contenido({ claseClicked }) {
    console.log(" DEBUG CONTENIDO ");
    console.log("claseClicked completo:", claseClicked);
    console.log("claseClicked.videoLeccion:", claseClicked.videoLeccion);

    const isYouTubeUrl = (url) => {
        if (!url) return false;
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const getVideoEmbedUrl = (url) => {
        if (!url) return '';
        
        // Si ya es una URL de embed de YouTube
        if (url.includes('youtube.com/embed/')) {
            return url;
        }
        
        // Si es una URL normal de YouTube
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
            }
        }
        
        // Si es una URL corta de YouTube
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
            }
        }

        return '';
    };

    const videoUrl = claseClicked.videoLeccion;
    const isYouTube = isYouTubeUrl(videoUrl);
    const embedUrl = isYouTube ? getVideoEmbedUrl(videoUrl) : null;

    console.log("URL final para video:", videoUrl);
    console.log("Es YouTube?", isYouTube);

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
                    {isYouTube ? (
                        // Video de YouTube (iframe)
                        embedUrl ? (
                            <iframe 
                                className="video"
                                width="560" 
                                height="315" 
                                src={embedUrl}
                                title={claseClicked.tituloLeccion} 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                loading="lazy"
                                onLoad={() => console.log("Iframe cargado correctamente")}
                                onError={(e) => console.error(" Error en iframe:", e)}
                            />
                        ) : (
                            <div className="video-placeholder">
                                <p>Video de YouTube no disponible</p>
                                <small>URL original: {videoUrl}</small>
                            </div>
                        )
                    ) : (
                        // Video directo (Cloudinary, MP4, etc.) usando <video>
                        <video 
                            className="video"
                            width="560" 
                            height="315" 
                            controls
                            preload="metadata"
                            onError={(e) => {
                                console.error("Error al cargar video:", e);
                                e.target.parentElement.innerHTML = `
                                    <div class="video-placeholder">
                                        <p>Error al cargar el video</p>
                                        <small>URL: ${videoUrl}</small>
                                    </div>
                                `;
                            }}
                        >
                            <source src={videoUrl} type="video/mp4" />
                            <source src={videoUrl} type="video/webm" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    )}
                </div>
            )}
            
            {/* 4. Imágenes y archivos */}
            <div className="recursos-adicionales">
                {claseClicked.imagenUrl && (
                    <div className="contenedor-imagen">
                        <h3>Archivos e Imagenes adicionales:</h3>
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
                            Descargar archivo
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contenido;