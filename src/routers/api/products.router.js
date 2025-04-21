import { Router } from "express";
import { productManager } from "../../data/managers/manager.mongo.js";

const productsRouter = Router()

const createOne = async (req,res,next) => {
    try{
        const {method, originalURL:URL} = req
        const data = req.body
        const response = await productManager.createOne(data)
        res.status(201).json({response,method,URL})
    }
    catch(error){
        next(error)
    }
}
const readAll = async (req,res,next) => {
    try{
        const {method, originalURL:URL} = req
        const filter = req.query
        const response = await productManager.readAll(filter)
        if(response.length === 0){
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({response,method,URL})
    }
    catch(error){
        next(error)
    }
}
const readById = async (req,res,next) => {
    try{
        const {method, originalURL:URL} = req
        const { id } = req.params
        const response = await productManager.readById(id)
        if(!response){
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
        }
        res.status(201).json({response,method,URL})
    }
    catch(error){
        next(error)
    }
}
const updateById = async (req,res,next) => {
    try{
        const {method, originalURL:URL} = req
        const { id } = req.params
        const data = req.body
        const response = await productManager.updateById(id,data)
        if(!response){
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({response,method,URL})
    }
    catch(error){
        next(error)
    }    
}
const deleteById = async (req,res,next) => {
    try{
        const {method, originalURL:URL} = req
        const { id } = req.params
        const response = await productManager.deleteById(id)
        if(!response){
            const error = new Error("Not Found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({response,method,URL})
    }
    catch(error){
        next(error)
    }    
}

productsRouter.post("/", createOne)
productsRouter.get("/", readAll)
productsRouter.get("/:getid", readById)
productsRouter.put("/:getid", updateById)
productsRouter.delete("/getid", deleteById)

export default productsRouter