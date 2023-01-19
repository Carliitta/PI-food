import React from 'react'
import{ Link,useHistory }from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import  { useState, useEffect } from 'react';
import { createRecipe, getDiets } from '../Redux/actions';
import "../css/create.css"
import logo from "../../img/OIP.jpeg"
import flecha from "../../img/volver.png"

export const CreateRecipe = () => {
    const dietas= useSelector(state=>state.diets)
    const recipes= useSelector(state=>state.allRecipes)
    const history= useHistory()

    const [input, setInput] = useState({
    nombre: "",
    descripcion: "",
    nivel: "",
    pasos: "",
    imagen:"",
    diet:[],
  
  });

  const [errors, setErrors] = useState({});
  //* validaciones : ///////////////////////////////////////////////

  const validateInput=(input)=>{
    let errors={}
    if (input.nombre.trim().length > 0) {
        let recipeExists = recipes.filter(e => e.nombre.toLowerCase() === input.nombre.toLowerCase());
        if(recipeExists.length > 0 ) errors.nombre ="The title already exists";
    }
    //trim elimina los espacios en blanco
     if(!input.nombre.trim()){
      errors.nombre= "Title is required";
    }
    if(!input.imagen.trim()){
      errors.imagen= "Imagen is required"
    }if(!input.nivel.trim()){
      errors.nivel= "Health score is required"
     
    } if(input.nivel <0 ||input.nivel >100 ){
      errors.nivel= "The value must be from 1 to 100";
    }
     if(!input.descripcion.trim()){
      errors.descripcion= "Description is required";
    } if(!input.pasos.trim()){
      errors.pasos= "Instructions is required";
    } 
     if(input.diet.length >1 ){
      errors.diet= "Diet is required";
    }  

      return errors;
     }

    const dispatch= useDispatch()
    useEffect(() => {
     dispatch(getDiets())
   
    }, [])
    

  function handleDelete(id) {
    setInput({
      ...input,
     diet: input.diet.filter((el) => el !== id)
    });
  }
  function handleSelect(e) {
   //vemos que no se ingrese la misma receta 2 veces
    if(!input.diet.includes(e.target.value)){
      setInput({
          ...input,
          diet: input.diet.concat(e.target.value)//almacena los seleccionado
      })} else {
          alert('You cant add the same diet twice')
      }
  
  }

  const handleChangue=(e)=>{
      /*
    1. Clona el estado actual
    2. Reemplaza solo el valor del
        input que ejecutó el evento
  */
    setInput({
        ...input,
        [e.target.name]: e.target.value  // name identifica el input y value describe el valor actual
    })

   
 }

 const handleBlur=()=>{

  setErrors(validateInput(input))
 }
const handleOnSubmit=(e)=>{
 e.preventDefault()
//verifica si las propiedades de el obj tiene length 
  if(Object.keys(errors).length){
    alert("You must complete all fields!")
  }else{

    dispatch(createRecipe(input))
    /* console.log(input) */
    alert("Recipe created successfully!")
    history.push("/home")
  }

}


  return (
    <div className='contenedorCrear'>
      
       <Link id="linkVolver2" to={"/home"}>
        <img src={flecha} alt="volver" />
        </Link>
        
       <form className='formulario' onSubmit={handleOnSubmit}>
       
             <img className='logo' src={logo} alt="logo" />
            <input required type="text" name='nombre' value={input.nombre} onChange={handleChangue} onBlur={handleBlur}  placeholder='Title...'/>
            {errors.nombre && <p style={{color:"red" , fontWeight:"bold"}}>{errors.nombre}</p>}
            <input required type="text" name='imagen' value={input.imagen} onChange={handleChangue} placeholder='image URL...'/>
            {errors.imagen && <p style={{color:"red" , fontWeight:"bold"}}>{errors.imagen}</p>}
            <input required type="number"  name='nivel' value={input.nivel} onChange={handleChangue} onBlur={handleBlur}   placeholder='Health score...'/>
            {errors.nivel && <p style={{color:"red", fontWeight:"bold" }}>{errors.nivel}</p>}
            <textarea required type="text" name='descripcion' value={input.descripcion} onChange={handleChangue} onBlur={handleBlur} placeholder='Description...'></textarea>
            {errors.descripcion && <p style={{color:"red", fontWeight:"bold"}}>{errors.descripcion}</p>}
            <textarea required type="text" name='pasos' value={input.pasos} onChange={handleChangue} onBlur={handleBlur} placeholder='Instructions...' ></textarea><br></br>
            {errors.pasos && <p style={{color:"red", fontWeight:"bold"}}>{errors.pasos}</p>}
            <select required  onChange={(e) => handleSelect(e)}  >
              <option hidden>seleccionar dieta</option>
              
            {
                dietas?.map((d,i)=>{
                    return(
                        <option key={i}  value={d.nombre}>{d.nombre}</option>
                    )
                })
            }
            </select>
        {/*    {errors.diet && <p style={{color:"red"}}>{errors.diet}</p>}  */}
                <div className='contenedorSelec' >
                    {input.diet?.map((d,i) => (
                        <div  key={i}>
                    <input  type="button"  className='btnDelete'  onClick={() => handleDelete(d)} value="x"/> 
                        <p  className='p'>{d}</p>
                        </div>
                    ))}
                </div>   
              
      

                <input className='btnSubmit'  type="submit"  value="Create Recipe"/> 
        
   
     </form>
    </div>
  )
}
