const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recetas = require("./rutaRecetas")
const diets = require("./rutaDiets")
const recetasDb = require("./rutaDB")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes",Recetas)
router.use("/diets",diets)
router.use("/db",recetasDb)
module.exports = router;
