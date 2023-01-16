
import { useDispatch,useSelector} from 'react-redux' 
import { useHistory,Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteRecipe, getMyRecipes } from '../Redux/actions';
import "../css/myRecipes.css"
import flecha from "../../img/volver.png"
export const Recipes = () => {
const myRecipes= useSelector(state=>state.myRecipes)
const dispatch= useDispatch()
const history=useHistory()

  useEffect(() => {
    dispatch(getMyRecipes())
   
  }, [])
  
const  deleteR = (id)=>{
  dispatch(deleteRecipe(id))
  alert("eliminado correctamente")
  history.push("/recipes_created") 
   window.location.reload()
}



  return (
    <div className='contenedor_myrecipes'>
         <Link id="linkVolver" to={"/home"}>
        <img src={flecha} alt="volver" />
        </Link>
    {/*   {  console.log(myRecipes)} */}
       <h1>My recipes:</h1>
      <div className='list_recipes'>
       
       {
        myRecipes.length?
        myRecipes.map((r,index)=>(
           <div>
         
            <h3 key={index}>{r.nombre}</h3>
            <img className='imgRes' src={r.imagen} alt="poster" />
            <div className='ver'>
            <button onClick={()=>deleteR(r.id)}>Delete</button>
            </div>
           </div>

          
        )): <p className='parrafo'>No recipes created..</p>
       }
   

      </div>
    </div>
  )
}
