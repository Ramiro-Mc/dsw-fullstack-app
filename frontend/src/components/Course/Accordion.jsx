import '../../component-styles/Accordion.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modulo from './Modulo';
    
function Accordion({ modulos, manejarClick, claseClicked }) {

  return (
  <div className="bg-dark text-white overflow-auto sidebar">
    <div className="accordion" id="Accordion">
      {modulos?.map((modulo, index) => (
        <Modulo
          key={index}
          modulo={modulo}
          index={index}
          AccordionId="Accordion"
          manejarClick={manejarClick}
          claseClicked={claseClicked}
        />
      )) || <div>No hay módulos disponibles</div>}
    </div>
  </div>
  );
};

export default Accordion;