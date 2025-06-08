import { productManager } from "../dao/factory.js"
import ProductsDTO from "../dto/products.dto.js"

class ProductsRepository{
    constructor(){
        this.manager = productManager
    }
    createOne = async(data) => await this.manager.createOne(new ProductsDTO(data))
    readBy = async(filter) => await this.manager.readBy(filter) 
    readAll = async(filter) => await this.manager.readAll(filter)
    readById = async(id) => await this.manager.readById(id)
    updateById = async(id,data) => await this.manager.updateById(id,data)
    deleteById = async(id) => await this.manager.deleteById(id)
}

const productsRepository = new ProductsRepository()

export default productsRepository