import RouterHelper from "../../helpers/router.helper.js";
import { createOne,readAll,readById,updateById,deleteById } from "../../controllers/products.controller.js";

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