const { Router } = require('express');
const axios = require("axios")
const {Recipe,Diet} = require("../db")
const router = Router();
require('dotenv').config();
const {
    API_KEY,
  } = process.env;

const datos = require("../jsonComidas.json");
const {getRecipesApi, getAllData, getDiets,getDBRecipes} = require('./helps');

router.get("/",async (req,res)=>{
   const {name} = req.query
         //*si se ingreso un nombre lo filtramos 
         const recipesApi= await getAllData()
         try{

             if(name){
                                                       
                   const nombreBusqueda=await recipesApi.filter(n=>n.nombre.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
                 
                    nombreBusqueda.length?
                    
                     res.send(nombreBusqueda):
                     res.send("The recipe is not found :c") 
                     
                }else{
                    //devuelvo todas las recetas
                   
                    recipesApi.length?
                    res.status(200).send(recipesApi):
                    res.status(404).send("no hay recetas que mostrar")
                }
         }catch(error){
            console.log(error)
         }
})


router.get("/:id",async (req,res)=>{
    const { id } = req.params
    let recipesTotal = await getAllData();
    try{

        if (id) {
            let recipeId= await recipesTotal.filter(el => el.id === id)
        
            recipeId.length ?
                res.status(200).send(recipeId) :
                res.status(404).send('No se encuentra la receta');
        }
    }catch(error){
        console.log(error)
    }
})


router.post("/",async (req,res)=>{
 const {nombre,descripcion,nivel,pasos,imagen,diet}= req.body
 try{

     const recetaCrear =await Recipe.create({nombre,descripcion,nivel,pasos,imagen})

         const dieta = await Diet.findAll({
            where:{
                nombre: diet
            }
        }) 
     recetaCrear.addDiet(dieta)
     
     res.status(200).send(recetaCrear)
 }catch(error){
    console.log(error)
 }
 
})

/* ELIMINAR  DESDE LA BD */

 router.delete("/:id",async (req,res)=>{
    const { id } = req.params
try {
    await Recipe.destroy({
        where:{
            id:id
        }
    }) ;
    res.send("Successfully deleted!")
    
} catch (error) {
    console.log(error)
}
}) 



module.exports = router;