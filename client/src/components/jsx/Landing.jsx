import React from 'react'
import   "../css/landing.css"
import {Link} from "react-router-dom"

function Landing() {
  return (
    <div className='contenedor'>
        <h1 className='tituloFood'> Foods </h1>
        <h2 className='nombre'>By Rodriguez Carla </h2>
        <Link to={"/home"}>
        <button className='btnInicio'>Iniciar</button> 
        </Link>
    </div>
  )
}

export default Landing