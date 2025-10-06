import '../../component-styles/Contenido.css'

function Contenido({ claseClicked }) {
    console.log("=== DEBUG CONTENIDO ===");
    console.log("claseClicked completo:", claseClicked);
    console.log("claseClicked.videoLeccion:", claseClicked.videoLeccion);
    console.log("Tipo de videoLeccion:", typeof claseClicked.videoLeccion);

    const getVideoEmbedUrl = (url) => {
        console.log("=== getVideoEmbedUrl ===");
        console.log("URL recibida:", url);
        console.log("URL es null/undefined?", url == null);
        console.log("URL es string vacío?", url === '');
        
        if (!url) {
            console.log("URL vacía, retornando string vacío");
            return '';
        }
        
        // Si ya es una URL de embed de YouTube
        if (url.includes('youtube.com/embed/')) {
            console.log("Ya es URL de embed:", url);
            return url;
        }
        
        // Si es una URL normal de YouTube
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            console.log("Video ID extraído de watch:", videoId);
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
                console.log("URL embed generada:", embedUrl);
                return embedUrl;
            }
        }
        
        // Si es una URL corta de YouTube
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            console.log("Video ID extraído de youtu.be:", videoId);
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
                console.log("URL embed generada:", embedUrl);
                return embedUrl;
            }
        }
        
        console.log("No se pudo procesar la URL:", url);
        return '';
    };

    const videoUrl = getVideoEmbedUrl(claseClicked.videoLeccion);
    console.log("URL final para iframe:", videoUrl);

    return (
        <div className="cont-principal">
            <h2>{claseClicked.tituloLeccion}</h2>
            <p>{claseClicked.contenido}</p>
            <hr/>
            <div className="contenedor-video">
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
                        onLoad={() => console.log("✅ Iframe cargado correctamente")}
                        onError={(e) => console.error("❌ Error en iframe:", e)}
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
        </div>
    )
}

export default Contenido;