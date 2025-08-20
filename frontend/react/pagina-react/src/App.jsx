import "./App.css";
import Header from "./components/Header.jsx";
import Accordion from "./components/Accordion.jsx";;
import Footer from "./components/Footer.jsx";
import Contenido from "./components/Contenido.jsx";
import BarraSuperior from "./components/Barrasuperior.jsx";
import { useState, useEffect } from "react";

function App() {
  const [modulos, setModulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [claseClicked, setClaseClicked] = useState({});
  const [cantCompletada, setCantCompletada] = useState(0)

  
  useEffect(() => {
  fetch("modulos.json")  // Cargar módulos desde un archivo JSON
    .then(res => res.json()) //convierte la respuesta a JSON
    .then(modulos => {
      setModulos(modulos); // Establece los módulos en el estado
      setClaseClicked(modulos[0].clases[0]);  // Inicializa la primera clase del array como claseClicked
      setCargando(false); 
    })
    .catch(err => {
      console.error("Error al cargar módulos:", err);
      setCargando(false);
    });
  }, []);
  

  const manejarClick = (clase) => {
    setClaseClicked(clase);
  };


  const completarClase = () => {
    setModulos((prevModulos) =>
      prevModulos.map((modulo) => ({
        ...modulo,
        clases: modulo.clases.map((clase) =>
          clase.idClase === claseClicked.idClase
            ? { ...clase, completado: !clase.completado }
            : clase
        ),
      }))
    );
    setClaseClicked({ ...claseClicked, completado: !claseClicked.completado });
    if (!claseClicked.completado) {
      setCantCompletada(cantCompletada + 1);
    }
    if (claseClicked.completado) {
      setCantCompletada(cantCompletada - 1);
    }
  };
  
  if (cargando) {
    return <strong>Cargando módulos...</strong>; 
  }



  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <Accordion
                modulos={modulos}
                manejarClick={manejarClick}
                claseClicked={claseClicked}
              />
            </div>

            <div className="col-9">
              <BarraSuperior
                completarClase={completarClase}
                claseClicked={claseClicked}
                cantCompletada={cantCompletada}
                modulos={modulos}
              />
              <Contenido claseClicked={claseClicked} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
