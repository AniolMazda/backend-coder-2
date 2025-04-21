import { Router } from "express";
import { productManager } from "../data/managers/manager.mongo.js";

const viewsRouter = Router()

const indexView = async (req,res) => {
    try{
        const products = productManager.readAll()
        res.status(200).render("index", {products})
    }
    catch(error){
        res.status(error.statusCode || 500).render("error",{error})
    }
}

viewsRouter.get("/", indexView)

export default viewsRouter