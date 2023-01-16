import "../css/nav.css"
import {Link} from "react-router-dom"
import find from "../../img/find.png"
import reload from "../../img/reload.png"
import React, { useState, useEffect } from 'react';
import {useDispatch} from "react-redux"
import { searchRecipe } from "../Redux/actions";
import recipe from "../../img/recipe-book.png"

function Nav({setPagina}) {
const [search, setSearch] = useState('');
const dispatch = useDispatch()

const handleSubmit =(e)=>{
e.preventDefault()
dispatch(searchRecipe(search))
setSearch("")
setPagina(1)
}
const handleChangue=(e)=>{
 setSearch(e.target.value)
}
  return (
    <div className='contenedorNav'>
        <nav>
 
        <form onSubmit={handleSubmit}>
  
             <div className="cajaBuscar" > 
   
             <input   type="text" onChange={handleChangue} value={search} placeholder='Search recipe...' />
             <button  type="submit"><img className='icon' src={find}></img></button>
             </div>
            </form>
          <div className="divLink">
            <Link className="linkCreate" to={"/create"}>Create recipe 
            </Link>
            <Link className="linkRecipes" to={"/recipes_created"} >My Recipes </Link>

          </div>
             
        </nav>
        <div id="reload">
         <button  onClick={() => window.location.reload()}><img  src={reload} title="recargar"  /></button> 

        </div>
    </div>
  )
}

export default Nav