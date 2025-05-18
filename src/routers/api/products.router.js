import RouterHelper from "../../helpers/router.helper.js";
import { productManager } from "../../data/managers/manager.mongo.js";

const createOne = async (req,res) => {
    const {_id} = req.user
    const data = req.body
    data.owner_id = _id
    const response = await productManager.createOne(data)
    res.json201(response,"Created Product")
}
const readAll = async (req,res) => {
    const filter = req.query
    const response = await productManager.readAll(filter)
    if(response.length === 0){
        res.json404()
    }
    res.json200(response)
}
const readById = async (req,res) => {
    const { pid } = req.params
    const response = await productManager.readById(pid)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response)
}
const updateById = async (req,res) => {
    const { pid } = req.params
    const data = req.body
    const response = await productManager.updateById(pid,data)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response,"Update Product")
}
const deleteById = async (req,res) => {
    const { pid } = req.params
    const response = await productManager.deleteById(pid)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response,"Delete Product")
}

class ProductsRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.create("/",["ADMIN"], createOne)
        this.read("/",["PUBLIC"], readAll)
        this.read("/:pid",["PUBLIC"], readById)
        this.update("/:pid",["ADMIN"], updateById)
        this.delete("/:pid",["ADMIN"], deleteById)
    }
}

const productsRouter = new ProductsRouter().getRouter()

export default productsRouter