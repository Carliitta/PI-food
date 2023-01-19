
import "../css/detalle.css"
import React, { useState , useEffect } from 'react';
import {useParams,Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getDetalle,clearDetail } from "../Redux/actions";
import flecha from "../../img/volver.png"
import {Spinner} from "../jsx/Spinner"
export const Detalle = () => {
    const detalle = useSelector(state=>state.detalle)
  
    let {id}= useParams()
  
    let dispatch= useDispatch()
    
    useEffect(() => {
      dispatch(getDetalle(id));
     return ()=>{
      dispatch(clearDetail())
     }
    },[])

    if(detalle.length===0)
    return(
      <div >
        <Spinner/>
      </div>
    )
  return (
    
    <div className='contenedorDetalle'>
    
        <Link id="linkVolver" to={"/home"}>
        <img src={flecha} alt="volver" />
        </Link>
       <div className="tarjeta">
            <div className="img-nombre-nivel">
                <h1>{detalle.nombre}</h1> 
                <img src={detalle.imagen} alt="imagen" />
                <h3>Health score:</h3>
                <p>{detalle.nivel}</p>
                <h3>Diets:</h3>
             {   <ul id="ul">
            {
              detalle.diets?.map((d,i)=>{
                  return(
                    <li id="li" key={i}>
                      {d.nombre?d.nombre: d} 
                    </li>
                  )
              }) 
             
            }
            </ul> }
            </div>
       <div className="pasos-descripcion">
        <h3>Description</h3>
        <p>{detalle.descripcion}</p>
        <h3>Instructions:</h3>
        <p>{detalle.pasos}</p>
       </div>
       </div>
       
    </div>
   
  )
}
