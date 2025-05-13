import { Router } from "express";
import { userManager } from "../../data/managers/manager.mongo.js";
import passport from "passport";

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
        const { uid } = req.params
        const data = req.body
        const response = await userManager.updateById(uid,data)
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
        const { uid } = req.params
        const response = await userManager.deleteById(uid)
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

usersRouter.get(
    "/",
    passport.authenticate("admin", optsForbidden),
    readAll
)
usersRouter.get(
    "/:uid",
    passport.authenticate("admin", optsForbidden),
    readById
)
usersRouter.put(
    "/:uid",
    passport.authenticate("admin", optsForbidden),
    updateById
)
usersRouter.delete(
    "/:uid",
    passport.authenticate("admin", optsForbidden),
    deleteById
)

export default usersRouter