import { Router } from "express";
import { userManager } from "../../data/managers/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const usersRouter = Router()

const readAll = async (req,res,next) => {
    try{
        const {method, originalUrl:URL} = req
        const filter = req.query
        const response = await userManager.readAll(filter)
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
        const { uid } = req.params
        const response = await userManager.readById(uid)
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
        const { _id } = req.user
        const data = req.body
        const response = await userManager.updateById(_id,data)
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
        const { _id } = req.user
        const response = await userManager.deleteById(_id)
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

usersRouter.get(
    "/",
    passportCb("admin"),
    readAll
)
usersRouter.get(
    "/:uid",
    passportCb("admin"),
    readById
)
usersRouter.put(
    "/",
    passportCb("user"),
    updateById
)
usersRouter.delete(
    "/",
    passportCb("admin"),
    deleteById
)

export default usersRouter