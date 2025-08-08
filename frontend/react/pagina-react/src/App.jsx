import './App.css'
import Header from './components/Header.jsx'
import Accordion from './components/Accordion.jsx'
import Footer from './components/Footer.jsx'
import Contenido from './components/Contenido.jsx';
import { useState } from 'react';

function App() {
  const modulos = [
    { titulo: "MÓDULO 0", clases: [{tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 0"}, {tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 0"}, {tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 0"}] },  
    { titulo: "MÓDULO 1", clases: [{tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 1"}, {tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 1"}, {tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 1"}] },
    { titulo: "MÓDULO 2", clases: [{tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 2"}, {tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 2"}, {tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 2"}] },
    { titulo: "MÓDULO 3", clases: [{tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 3"}, {tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 3"}, {tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 3"}] },
    { titulo: "MÓDULO 4", clases: [{tituloClase: "Clase 1", contenido: "Contenido de la Clase 1, modulo 4"}, {tituloClase: "Clase 2", contenido: "Contenido de la Clase 2, modulo 4"}, {tituloClase: "Clase 3", contenido: "Contenido de la Clase 3, modulo 4"}] }
  ];

  const[claseClicked, setClaseClicked] = useState(modulos[0].clases[0]);
  
  const manejarClick = (clase) => {
    setClaseClicked(clase);
  }


  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <Accordion 
              modulos={modulos} 
              manejarClick={manejarClick} />
            <Contenido claseClicked={claseClicked} />
          </div>  
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
