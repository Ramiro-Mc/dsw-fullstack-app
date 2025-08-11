import './App.css'
import Header from './components/Header.jsx'
import Accordion from './components/Accordion.jsx'
import Footer from './components/Footer.jsx'
import Contenido from './components/Contenido.jsx';
import BarraSuperior from './components/BarraSuperior.jsx';
import { useState } from 'react';

function App() {

  const [modulos, setModulos] = useState([
    { titulo: "MÓDULO 0", clases: 
      [{idClase: "0001", tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 0", videoClase: "https://www.youtube.com/embed/MPLN1ahXgcs", completado: false}, 
      {idClase: "0002", tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 0", videoClase: "https://www.youtube.com/embed/6rqT8OP-yn0", completado: false}, 
      {idClase: "0003", tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 0", videoClase: "https://www.youtube.com/embed/EH4L-EYt63Y", completado: false}] },  

    { titulo: "MÓDULO 1", clases: 
      [{idClase: "0101", tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 1", videoClase: "", completado: false}, 
        {idClase: "0102", tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 1", videoClase: "", completado: false}, 
        {idClase: "0103", tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 1", videoClase: "", completado: false}] },

    { titulo: "MÓDULO 2", clases: 
      [{idClase: "0201", tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 2", videoClase: "", completado: false}, 
        {idClase: "0202", tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 2", videoClase: "", completado: false}, 
        {idClase: "0203", tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 2", videoClase: "", completado: false}] },

    { titulo: "MÓDULO 3", clases: 
      [{idClase: "0301", tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 3", videoClase: "", completado: false}, 
        {idClase: "0302", tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 3", videoClase: "", completado: false}, 
        {idClase: "0303", tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 3", videoClase: "", completado: false}] },

    { titulo: "MÓDULO 4", clases: 
      [{idClase: "0401", tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 4", videoClase: "", completado: false}, 
        {idClase: "0402", tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 4", videoClase: "", completado: false}, 
        {idClase: "0403", tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 4", videoClase: "", completado: false}] }
  ]);

  const[claseClicked, setClaseClicked] = useState(modulos[0].clases[0]);
  

  
  const manejarClick = (clase) => {
    setClaseClicked(clase);
  };


  const completarClase = () => {
    setModulos(prevModulos =>
      prevModulos.map(modulo => ({
        ...modulo,
        clases: modulo.clases.map(clase =>
          clase.idClase === claseClicked.idClase
            ? { ...clase, completado: !clase.completado}
            : clase
        )
      })) 
    );
    setClaseClicked({ ...claseClicked, completado: !claseClicked.completado });
  };
  
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">

            <div className='col-3'>
              <Accordion 
                modulos={modulos} 
                manejarClick={manejarClick}
                claseClicked={claseClicked}
               />
            </div>

            <div className='col-9'>
              <BarraSuperior 
                completarClase={completarClase}
                claseClicked ={claseClicked}
              />
              <Contenido claseClicked={claseClicked} />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
