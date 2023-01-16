import "../css/home.css"
import Nav from "./Nav"
import { useDispatch,useSelector } from 'react-redux'
import React, {Fragment, useState, useEffect } from 'react';
import { deleteRecipe, getAllRecipes,getDiets } from "../Redux/actions";
import { Card } from "./Card";
import {Spinner} from "./Spinner"
import {Link} from "react-router-dom"
import { Pagination } from "./Pagination";
import { Filters } from "./Filters";

function Home (){
  const recipes = useSelector((state)=> state.allRecipes)
  const dispatch= useDispatch()

   //*paginacion
   const [currentPage, setCurrentPage] = useState(1)//pagina actual 
   const [forPage, setforPage] = useState (9);//cantidad a mostrar por pagina
   const maximo = Math.ceil(recipes.length / forPage);// tengo el largo de las recetas y lo divido por la cantidad amostrar ej:20/3=6(osea quedan 6 paginas)

   //*
 
   useEffect(() => {
   dispatch(getAllRecipes())
   dispatch(getDiets())
 

  }, []);



  if(!recipes.length){
    return(
      <Spinner/> 
    )
  }

  return (
    <>
        <div className='contenedorHome'> 
     <Nav setPagina={setCurrentPage}/>
     <Filters setPagina={setCurrentPage}/>
                  {/*  //le paso la pagina actual- seteador de pagina- el length de las recetas */}
                   <Pagination  pagina={currentPage} setPagina={setCurrentPage} maximo={maximo}/>
          <div className="grid">
    
            {                                                                               
              recipes.slice ( //a todas las recetas hago un slice donde inicia en paginaActual-1=0 * cantididad a mostrar por paginas(3) -->resultado =0
                (currentPage - 1) * forPage,
                (currentPage - 1) * forPage + forPage//y termina en paginaActual-1=0 * cantididad a mostrar por paginas(3)+cantididad a mostrar por paginas(3) -->resultado =3
              ) .map((r,i)=> {//resultado seria del 0 al 3 ,y cada pagina se setea el estado y aumenta
                return(
                  <Card key={i}
                  id={r.id}
                  name={ r.nombre}
                  imagen={ r.imagen}
                  dieta=  {r.diets?.map((diet,i)=> <>  {diet.nombre ? diet.nombre : diet},
                 </>)}/>
                )
               }
              )
            }
          </div>   
        </div>
   
    </>
  )
}
export default Home;
