const axios = require("axios")
const {Recipe,Diet} = require("../db")
require('dotenv').config();
const {
    API_KEY,
  } = process.env;

const datos = require("../jsonComidas.json")

async function getRecipesApi() {

     //*traer datos de la API
  /*   const recetas = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,{
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
 
      const dataApi= recetas.data.results.map(r=>{ 
        return {
           id: String(r.id),
           nombre: r.title,
           descripcion:r.summary.replace(/[^a-zA-Z 0-9.]+/g,' '),
           imagen:r.image,
           nivel:r.healthScore,
           pasos: (r.analyzedInstructions[0] && r.analyzedInstructions[0].steps?r.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):''),
           diets: r.diets.map((e) => (e))
        
       } 
      }) 
      return dataApi  */ 
        //*traer datos de la API   /*<--- local */
  const dataApi=await datos.map(e=>{     
               
            return{
                id: String(e.ID),
                nombre:e.name,
                descripcion:e.descripcion,
                imagen:e.imagen,
                nivel:e.nivel,
                pasos:e.pasos,
                diets: e.dietas.map((d) => d.nombre)
            }
        }  
        )      
        return dataApi   
   
};


const getDBRecipes = async () => {
    const allRecipesDb = await Recipe.findAll({
      
      include: {
        model: Diet,
        attributes: ["nombre"],
        through: {
          attributes: [],
        },
      },
    });
    return allRecipesDb;
  };
  
  const getAllData = async () => {
    const recipes = await getRecipesApi();
    const dbRecipes = await getDBRecipes();
    const dbRecipesIds = await dbRecipes.concat(recipes);
    return dbRecipesIds;
  };
   const  getDiets =async () => {
    try {
  /*   const dietApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,{
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })  */
          const dietApi= datos                                         /*<--- local */
          //hacemos un map para taernos las dietas. flat para que solo quede un array
           const dataDiets=dietApi.map(d=>d.dietas)           /*<--- local */
   
      // const dataDiets=dietApi.data.results.map(e=>e.diets)            /*<--- api */
        //y el new set nos permite elimiar los elemnetos repetidos
        const filterDiets= new Set([...dataDiets.flat()])
        const filterDiets2= [...filterDiets,"vegetarian"]
        filterDiets2.forEach(e=>{
            Diet.findOrCreate({
                where:{
                  //nombre:e
                   nombre: e.nombre || ""  /*  <--- local */
                }
            })
        })
   
        const allDiets = await Diet.findAll()
      
        return allDiets
    } catch (error) {
    console.log(error);
  } 
 
 }

module.exports= {getAllData, getRecipesApi, getDiets,getDBRecipes};