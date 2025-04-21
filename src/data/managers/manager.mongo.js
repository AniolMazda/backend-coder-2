import { productModel } from "../models/products.model.js"
import { cartModel } from "../models/carts.model.js"
import { userModel } from "../models/users.model.js"

class Manager {
    constructor (model){
        this.model = model
    }
    createOne = async (data) => await this.model.create(data)
    readAll = async (filter) => await this.model.find(filter).lean()
    readById = async (id) => await this.model.findById(id).lean()
    readBy = async (filter) => await this.model.findOne(filter).lean()
    updateById = async (id,data) => await this.model.findByIdAndUpdate(id,data,{new:true})
    deleteById = async (id) => await this.model.findByIdAndDelete(id)
}

const productManager = new Manager(productModel)
const cartManager = new Manager(cartModel)
const userManager = new Manager(userModel)

export {productManager,cartManager,userManager}