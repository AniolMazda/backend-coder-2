import { Router } from "express"
import setupResponses from "../middlewares/setupResponses.mid.js"
import seputPolicies from "../middlewares/setupPolicies.mid.js"

class RouterHelper {
    constructor(){
        this.router = Router()
        this.use(setupResponses)
    }
    getRouter = () => this.router
    applyMiddlewares = (middlewares) => 
        middlewares.map(mid => async (req,res,next)=>{
            try {
                await mid(req,res,next)
            } catch (error) {
                next(error)
            }
        }
    )
    applyMiddlewaresToRender = (middlewares) => 
        middlewares.map(mid => async (req,res,next)=>{
            try {
                await mid(req,res,next)
            } catch (error) {
                res.status(error.statusCode || 500).render("error",{error})
            }
        }
    )
    create = (path, policies, ...middlewares) => this.router.post(path, seputPolicies(policies), this.applyMiddlewares(middlewares))
    read = (path, policies, ...middlewares) => this.router.get(path, seputPolicies(policies), this.applyMiddlewares(middlewares))
    update = (path, policies, ...middlewares) => this.router.put(path, seputPolicies(policies), this.applyMiddlewares(middlewares))
    delete = (path, policies, ...middlewares) => this.router.delete(path, seputPolicies(policies), this.applyMiddlewares(middlewares))
    use = (path, ...middlewares) => this.router.use(path, this.applyMiddlewares(middlewares))
    render = (path, policies, ...middlewares) => this.router.get(path, seputPolicies(policies), this.applyMiddlewaresToRender(middlewares))
}
export default RouterHelper