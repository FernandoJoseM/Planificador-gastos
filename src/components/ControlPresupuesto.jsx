import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setgastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => {
      return gasto.cantidad + total;
    }, 0);
    const totalDisponible = setDisponible(presupuesto - totalGastado);

    // calcular porcentaje gastado
    const nuevoPorcentaje = ((totalGastado / presupuesto) * 100).toFixed(2);
    console.log(nuevoPorcentaje);
    setPorcentaje(nuevoPorcentaje);

    setGastado(totalGastado);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp=()=>{
    const resultado=confirm('¿Deseas resetear presupuesto y gasto')
    if(resultado){
      setgastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <button className="reset-app"type="button"onClick={handleResetApp}>Resetear App</button>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#3b82f6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "red" : "#3b82f6",
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponibe: </span>
          {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
