import {React, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { orderByAlf, orderBySalud ,getDiets, orderByDiets,orderByDborApi} from '../Redux/actions';
import { useHistory } from 'react-router-dom';

import "../css/filtros.css"

export const Filters = ({setPagina}) => {
    const dietas = useSelector(state=>state.diets)
    const dispatch = useDispatch()
    const history = useHistory()

    function orderAZ(e){
        dispatch(orderByAlf(e.target.value))
      
        history.push("/home")
        setPagina(1)
      }

      function orderNivel(e){
        dispatch(orderBySalud(e.target.value))
  
        history.push("/home")
        setPagina(1)
      }

      function getDietas(e){
        dispatch(orderByDiets(e.target.value))
        history.push("/home")
        setPagina(1)
      
       
      }
      function orderApiDb (e){
        dispatch(orderByDborApi(e.target.value))
        history.push("/home")
        setPagina(1)
      
       
      }
     
   
  return (
     <div>
         <div className="contenedorFiltros">
            <h3>Filter by:</h3>
            <select  name="" id="" onChange={orderAZ}>
                <option hidden>A↑Z</option>
                <option value="ASCENDENTE">A-Z</option>
                <option value="DESCENDENTE">Z-A</option>
            </select>
            
            <select name="" id="" onChange={orderNivel}>
                <option hidden>Health score</option>
                <option value="all">All</option>
                <option value="MAS_SALUDABLE">healthier</option>
                <option value="MENOS_SALUDABLE">less healthy</option>
            </select>
            <select name="" id="" onChange={getDietas}>
                <option  hidden>Diets</option>
                <option value="all">All</option>
               
                {
                    dietas.map((e,i)=> 
                        <option key={i} value={e.nombre}>{e.nombre}</option>
                    )
                   
                }
               
            </select>
            <select  name="" id="" onChange={orderApiDb}>
                <option hidden>Api-Db</option>
                <option value="API">Api</option>
                <option value="DB">DataBase</option>
            </select>
         </div>

    </div>
  )
}
