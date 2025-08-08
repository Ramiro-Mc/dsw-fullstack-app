import './App.css'
import Header from './components/Header.jsx'
import Accordion from './components/Accordion.jsx'
import Footer from './components/Footer.jsx'
import Contenido from './components/Contenido.jsx';

function App() {
  const modulos = [
    { titulo: "MÓDULO 0", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 1", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 2", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 3", clases: ["Clase 1", "Clase 2", "Clase 3"] },
    { titulo: "MÓDULO 4", clases: ["Clase 1", "Clase 2", "Clase 3"] }
  ];
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <Accordion modulos={modulos} />
            <Contenido />
          </div>  
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
