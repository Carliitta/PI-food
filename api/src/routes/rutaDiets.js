const { Router } = require('express');
const axios = require("axios")
const {Recipe,Diet} = require("../db")
const router = Router();
const { getDiets} = require('./helps');

router.get("/", async(req,res,next)=>{
    try {
        const dietas = await getDiets()
        dietas.length  ?
        res.status(200).send(dietas) :
        res.status(400).send("no hay dietas")       
    }
     catch (error) {
        next(error)
    }
})
module.exports = router;