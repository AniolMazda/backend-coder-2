import RouterHelper from "../../helpers/router.helper.js";
import { readAll,readById,updateById,deleteById,sendEmails,resetPasswordCb,recoveryPassword } from "../../controllers/users.controller.js";

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
        this.read("/email/:email",["PUBLIC"],sendEmails)
        this.read("/recoveryPassword/:email",["PUBLIC"],recoveryPassword)
        this.update("/resetPassword/:email",["PUBLIC"],resetPasswordCb)
    }
}

const usersRouter = new UsersRouter().getRouter()

export default usersRouter