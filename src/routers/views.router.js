import RouterHelper from "../helpers/router.helper.js";
import {indexView,registerView,loginView,detailsView,profileView,verifyView,resetView,recoveryView} from "../controllers/views.controller.js"

class ViewsRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.render("/",["PUBLIC"],indexView)
        this.render("/register",["PUBLIC"],registerView)
        this.render("/login",["PUBLIC"],loginView)
        this.render("/details/:pid",["PUBLIC"],detailsView)
        this.render("/profile",["USER","ADMIN"], profileView)
        this.render("/verify/:email",["PUBLIC"],verifyView)
        this.render("/recoveryPassword",["PUBLIC"],recoveryView)
        this.render("/resetPassword/:email",["PUBLIC"],resetView)
    }
}

const viewsRouter = new ViewsRouter().getRouter()

export default viewsRouter