import RouterHelper from "../../helpers/router.helper.js";
import { userManager } from "../../data/managers/manager.mongo.js";

const readAll = async (req,res) => {
    const filter = req.query
    const response = await userManager.readAll(filter)
    if(response.length === 0){
        res.json404("User Not Found")
    }
    res.json200(response)
}
const readById = async (req,res) => {
    const { uid } = req.params
    const response = await userManager.readById(uid)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response)
}
const updateById = async (req,res) => {
    const { _id } = req.user
    const data = req.body
    const response = await userManager.updateById(_id,data)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response, "Updated User")  
}
const deleteById = async (req,res) => {
    const { _id } = req.user
    const response = await userManager.deleteById(_id)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response, "Deleted User")  
}

class UsersRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.read("/",["ADMIN"],readAll)
        this.read("/:uid",["ADMIN"],readById)
        this.update("/",["ADMIN"],updateById)
        this.delete("/",["ADMIN"],deleteById)
    }
}

const usersRouter = new UsersRouter().getRouter()

export default usersRouter