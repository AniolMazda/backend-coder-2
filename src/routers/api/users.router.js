import RouterHelper from "../../helpers/router.helper.js";
import { readAll,readById,updateById,deleteById } from "../../controllers/users.controller.js";

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