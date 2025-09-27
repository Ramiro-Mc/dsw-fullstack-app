import '../../styles/Accordion.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modulo from './Modulo';
    
function Accordion({ modulos, manejarClick, claseCompletada, claseClicked }) {

  return (
  <div className="bg-dark text-white overflow-auto sidebar">
    <div className="accordion" id="Accordion">
      {modulos.map((modulo, index) => (
        <Modulo
          key={index}
          modulo={modulo}
          index={index}
          AccordionId="Accordion"
          manejarClick={manejarClick}
          claseCompletada={claseCompletada}
          claseClicked={claseClicked}
        />
      ))}
    </div>
  </div>
  );
};

export default Accordion;
