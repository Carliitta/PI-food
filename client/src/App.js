import './App.css';
import {Route,BrowserRouter} from "react-router-dom"
import Landing from './components/jsx/Landing';
import  Home from './components/jsx/Home';
import { Detalle } from './components/jsx/Detalle';
import { CreateRecipe } from './components/jsx/CreateRecipe';
import { Recipes } from './components/jsx/Recipes';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:3001/"
function App() {
  return (
   <BrowserRouter>
    <Route exact path={"/detail/:id"} component= {Detalle}></Route>
    <Route exact path={"/"} component= {Landing}></Route> 
    <Route exact path={"/create"} component= {CreateRecipe}></Route> 
    <Route exact path={"/home"} component= {Home}></Route>
    <Route exact path={"/recipes_created"} component= {Recipes}></Route>
   </BrowserRouter>
  );
}

export default App;
