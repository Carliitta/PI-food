import axios from "axios"
export const TYPES={
   GET_RECIPES:"GET_RECIPES",
   GET_DIETS:"GET_DIETS",
   SEARCH_RECIPE:"SEARCH_RECIPE",
   ORDEN_ALFABETICO:"ORDEN_ALFABETICO",
   ORDEN_SALUDABLE:"ORDEN_SALUDABLE",
   ORDER_DIETS:"ORDER_DIETS",
   GET_DETALLE:" GET_DETALLE",
   POST_RECIPE:"POST_RECIPE",
   DELETE_RECIPE:"DELETE_RECIPE",
   RECIPES_DB:"RECIPES_DB"

}

 export function getAllRecipes(){
    return async function(dispatch){
      try {
          var json = await axios.get('http://localhost:3001/recipes')
          const array=[]
          array.push(json.data)
        
          return dispatch({
              type: TYPES.GET_RECIPES,
              payload: array[0]
           })
       } catch (error) {
        console.log(error)
       }
   }
 }

 export function searchRecipe(name){
    return async function(dispatch){
      try {
          var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
          if(typeof json.data === 'object'){ //pregunto si lo que viene es un ojeto? sino mando el error 
              return dispatch({
                 type: TYPES.SEARCH_RECIPE,
                 payload: json.data
              }) 
          }else{
            alert(json.data)//error del back
          }
         
       } catch (error) {
        console.log(error);
       }
   }
 }
 export function getDiets(){
  return async function(dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/diets`)
       
            return dispatch({
               type: TYPES.GET_DIETS,
               payload: json.data
            }) 
     } catch (error) {
      console.log(error);
     }
 }
}

export function getDetalle(id){
  return async function(dispatch){
    try {
      var json =  await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
               type: TYPES.GET_DETALLE,
               payload: json.data[0]
               
            })  
     } catch (error) {
      console.log(error);
     }
 }
}

export function deleteRecipe(id){
  return async function(dispatch){
    try {
         await axios.delete(`http://localhost:3001/recipes/${id}`)
          
            return dispatch({
               type: TYPES.DELETE_RECIPE,
              
            }) 
     } catch (error) {
      console.log(error);
     }
 }
}

export function createRecipe(posts){
  return async function(dispatch){
    try {
      await axios.post(`http://localhost:3001/recipes`,posts)
        return dispatch({
            type: TYPES.POST_RECIPE
            
         })
     } catch (error) {
      console.log(error)
     }
 }
}

export function getMyRecipes(){
  return async function(dispatch){
    try {
      const json= await axios.get(`http://localhost:3001/db`)
        return dispatch({
            type: TYPES.RECIPES_DB,
            payload:json.data
         })
     } catch (error) {
      console.log(error)
     }
 }
}
export  function orderByDiets(order) { //recive una forma de ordenar

  return{
   type :TYPES.ORDER_DIETS ,
   payload:order
  }
};
 export  function orderByAlf(order) { //recive una forma de ordenar
  return{
   type :TYPES.ORDEN_ALFABETICO,
   payload:order
  }
};

export  function orderBySalud(order) { //recive una forma de ordenar
  return{
   type :TYPES.ORDEN_SALUDABLE,
   payload:order
  }
};
