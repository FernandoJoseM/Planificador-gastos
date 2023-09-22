import { useState,useEffect } from "react"


const Filtros = ({filtro,setFiltro}) => {
  return (
    <div className="filtros sombra contenedor">
        <form>
            <div className="campo">
                <label>Filtrar Gastos</label>
                <select
                value={filtro}
                onChange={e=>setFiltro(e.target.value)}
                >
                    <option value="">--todas las categorias</option>
                    <option value="ahorro">--Ahorro</option>
                    <option value="comida">--Comida</option>
                    <option value="hogar">--Hogar</option>
                    <option value="gastos">--Gastos Varios</option>
                    <option value="tiempo">--tiempo Libre</option>
                    <option value="salud">--Salud</option>
                    <option value="suscripciones">--Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros