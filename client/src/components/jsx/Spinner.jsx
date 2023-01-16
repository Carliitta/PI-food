import React from 'react'
import "../css/spinner.css"
export const Spinner = () => {
  return (
    <div id="contenedor">
        <div className="contenedor-loader">
        <div className="loader"></div>
        </div>
        <div className="cargando">Loading... </div>
   </div>
  )
}



