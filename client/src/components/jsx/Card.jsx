import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../css/card.css"


export const Card = ({id,name,imagen,dieta}) => {
   
  return (
    <div className='contenedorCard'>
            <Link id='link' to={"/detail/"+ id}>
            <div className="card">
              <h3 className='titulo'>{name}</h3>
              <img className='poster' src={imagen} alt="poster"/>
              <p className='parrafoDieta'> Diet: </p>
              <h5>{dieta}</h5>
             
            </div>
            </Link>
    </div>
  )
}
