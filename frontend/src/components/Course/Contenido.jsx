import '../../component-styles/Contenido.css'

function Contenido({ claseClicked }) {
    return (
        <div className="cont-principal">
            <h2>{claseClicked.tituloClase}</h2>
            <p>{claseClicked.contenido}</p>
            <hr/>
            <div className="contenedor-video">
                <iframe className="video"
                width="560" 
                height="315" 
                src={claseClicked.videoClase} 
                title={claseClicked.tituloClase} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                ></iframe> 
            </div>
        </div>
    )
}

export default Contenido;
