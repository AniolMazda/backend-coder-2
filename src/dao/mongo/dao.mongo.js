import { productModel } from "./models/products.model.js"
import { cartModel } from "./models/carts.model.js"
import { userModel } from "./models/users.model.js"

class DaoMongo {
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

const productManager = new DaoMongo(productModel)
const cartManager = new DaoMongo(cartModel)
const userManager = new DaoMongo(userModel)

export {productManager,cartManager,userManager}