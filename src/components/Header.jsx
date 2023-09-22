import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";
const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setgastos
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
      {
        isValidPresupuesto
        ?
        <ControlPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setgastos={setgastos}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />
        :(
          <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
      />
        )
      }
      
    </header>
  );
};

export default Header;
