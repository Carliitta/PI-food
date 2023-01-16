import { TYPES } from "./actions"
const initialState={
recipes:[],
allRecipes:[],
diets:[],
detalle:[],
myRecipes:[]
}
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.GET_RECIPES:
    return{
       ...state,
      recipes: action.payload,
      allRecipes:action.payload
    }
    case TYPES.SEARCH_RECIPE:
      return{
         ...state,
        allRecipes: action.payload,
      }
      case TYPES.GET_DIETS:
        return{
           ...state,
          diets: action.payload,
          
        }
        case TYPES.GET_DETALLE:
          return{
             ...state,
            detalle:action.payload
          }
          case TYPES.POST_RECIPE:
            return{
               ...state,
            }
            case TYPES.DELETE_RECIPE:
              return{
                 ...state,
              
              }
              case TYPES.RECIPES_DB:
                return{
                   ...state,
                  myRecipes:action.payload
                }
      case TYPES.ORDEN_ALFABETICO:
        if(action.payload==="ASCENDENTE"){
          return {
            ...state,
            allRecipes: state.allRecipes.sort((a, b) => {
              if (a.nombre < b.nombre) {
                return -1;
            }
            if (a.nombre > b.nombre) {
                return 1;
            }
            return 0;
          }) 
        }
      } if(action.payload==="DESCENDENTE"){
          return{
             ...state,
             allRecipes: state.allRecipes.sort((a, b) => {
              if (a.nombre < b.nombre) {
                return 1;
            }
            if (a.nombre > b.nombre) {
                return -1;
            }
            return 0;
          }) 
        }
      }
      case TYPES.ORDEN_SALUDABLE:
        if(action.payload==="all"){
          return{
            ...state,
           allRecipes: state.recipes
          }
        }
        if(action.payload==="MENOS_SALUDABLE"){
          return {
            ...state,
            allRecipes: state.allRecipes.sort((a, b) => {
              if (a.nivel < b.nivel) {
                return -1;
            }
            if (a.nivel > b.nivel) {
                return 1;
            }
            return 0;
          }) 
        }
      }else{
          return{
             ...state,
             allRecipes: state.allRecipes.sort((a, b) => {
              if (a.nivel < b.nivel) {
                return 1;
            }
            if (a.nivel > b.nivel) {
                return -1;
            }
  
          }) 
        }
      }
      case TYPES.ORDER_DIETS:
         const recipes=state.allRecipes
       
         const result=  recipes.filter(r=> r.diets.includes(action.payload) )
         if(action.payload==="all"){
       
          return{
            ...state,
           allRecipes: state.recipes
          }
        }else {
          return{
           ... state,
           allRecipes: result
     
          }

        }
          
    default:
        return state;
   }
    
}