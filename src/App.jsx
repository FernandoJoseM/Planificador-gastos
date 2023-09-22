import { useEffect, useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Gasto from "./components/Gasto";
import Filtros from "./components/Filtros";


function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setgastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 250);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])
  

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem("presupuesto")) ?? 0;

    if (presupuestoLs > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
    setGastoEditar({});
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // actualizar
      const gastosActualizados = gastos.map((element) =>
        element.id === gasto.id ? gasto : element
      );
      setgastos(gastosActualizados);
      setGastoEditar({});
    } else {
      // nuevoGasto
      gasto.id = generarId();
      gasto.fecha = new Date();
      setgastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 250);
    console.log(gasto);
  };
  const eliminarGasto = (id) => {
    const gastoDelete = gastos.filter((gasto) => gasto.id !== id);
    setgastos(gastoDelete);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setgastos={setgastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
