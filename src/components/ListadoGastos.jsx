import Gasto from "./Gasto";
const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      

      {filtro ? (
        <>
        <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria"}</h2>
          {gastosFiltrados.map((el) => (
          <Gasto
            key={el.id}
            el={el}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
          ))}
        </>
      ) : (
        gastos.map((el) => (
          <Gasto
            key={el.id}
            el={el}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
        ))
      )}
    </div>
  );
};

export default ListadoGastos;
