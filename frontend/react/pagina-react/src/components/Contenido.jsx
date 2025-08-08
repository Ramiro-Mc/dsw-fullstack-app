import '../styles/Contenido.css'

function Contenido({ claseClicked }) {
    return (
        <div className="col-9 bg-light cont-principal">
            <h2>{claseClicked.tituloClase}</h2>
            <p>{claseClicked.contenido}</p>
        </div>
    )
}

export default Contenido;
