
const { Router } = require('express');
const axios = require("axios")
const {Recipe,Diet} = require("../db")
const {getDBRecipes}=require("./helps")
const router = Router();

router.get("/",async (req,res)=>{

    const dataDB= await getDBRecipes()
    if(dataDB.length){
 
        res.send(dataDB)
    }else{
     res.status(400).send("No hay recetas creadas")
    }
 
 })

 module.exports = router;