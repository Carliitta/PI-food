import React from 'react'
import "../css/pagination.css"
import anterior from "../../img/anterior.png"
import siguiente from "../../img/siguiente.png"
export const Pagination = ({setPagina,pagina,maximo}) => {

    const pages = [];
    for(let i=1 ; i<=maximo; i++){ //guardo cada numero de pagina en un array
        pages.push(i);
    }


    const siguientePagina=()=>{
    if(pagina !== maximo){//si la pagina actual es distinto al length de las recetas ej= 3 !== 15
      setPagina(anteriror=>anteriror+1)//le sumamos una pagina siguiente 
    }
  }
  const anteriorPagina=()=>{//si la pagina actual es distinta a 0 le restamos una pagina 
    if(pagina !== 0){
      setPagina(anteriror=>anteriror-1)
    }
  } 
  return (
    <div className='contenedorPagina'>
        <button id='anterior'
         disabled={pagina === 1 || pagina < 1}//desabilitamos el boton si la pagina es igual a 1 0 menor a 1
         onClick={anteriorPagina}>
          <img hidden={pagina === 1 || pagina < 1}  src={anterior} alt="anterior" /> 
          </button>
        
            <ul >
                {
                pages.map(number =>(//hago un map al array con los numeros y creo una lista con cada uno
                    <li key={number}>{/* con un link que al dar click setea el valor con el numero que presionamos y os lleva a esa pagina */}
                        <a  className={number == pagina ? "active" : ""} id='numeros' onClick={()=> setPagina(number)}> {number} </a> 
                    </li> 
                ))}
            </ul>
        
        <button id='siguiente'
         disabled={pagina === Math.ceil (maximo) 
        || pagina > Math.ceil (maximo)}//desabilitamos el boton si la pagina es igual al maximo valor (al ultima pagina)o mayor 
         onClick={siguientePagina}>
         <img hidden={pagina === Math.ceil (maximo) 
        || pagina > Math.ceil (maximo)} src={siguiente} alt="siguiente" />
        </button> 
    </div>
  )
}
