import { Router } from "express";
import { productManager } from "../../data/managers/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const productsRouter = Router()

const createOne = async (req,res,next) => {
    try{
        const {method, originalUrl:URL} = req
        const {_id} = req.user
        const data = req.body
        data.owner_id = _id
        const response = await productManager.createOne(data)
        res.status(201).json({response,method,URL})
    }
    catch(error){
        next(error)
    }
}
const readAll = async (req,res,next) => {
    try{
        const {method, originalUrl:URL} = req
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
        const {method, originalUrl:URL} = req
        const { pid } = req.params
        const response = await productManager.readById(pid)
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
const updateById = async (req,res,next) => {
    try{
        const {method, originalUrl:URL} = req
        const { pid } = req.params
        const data = req.body
        const response = await productManager.updateById(pid,data)
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
        const {method, originalUrl:URL} = req
        const { pid } = req.params
        const response = await productManager.deleteById(pid)
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

const optsForbidden = {
    session:false,
    failureRedirect:"/api/auth/forbidden"
}

productsRouter.post("/", passportCb("admin"), createOne)
productsRouter.get("/", readAll)
productsRouter.get("/:pid", readById)
productsRouter.put("/:pid", passportCb("admin"), updateById)
productsRouter.delete("/:pid", passportCb("admin"), deleteById)

export default productsRouter