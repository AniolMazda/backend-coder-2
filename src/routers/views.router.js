import RouterHelper from "../helpers/router.helper.js";
import { productManager } from "../data/managers/manager.mongo.js";

const indexView = async (req,res) => {
    const products = await productManager.readAll()
    res.status(200).render("index", {products})
}
const registerView = async (req,res) => {
    res.status(200).render("register")
}
const loginView = async (req,res) => {
    res.status(200).render("login")
}
const detailsView = async (req,res) => {
    const { pid } = req.params
    const product = await productManager.readById(pid)
    res.status(200).render("details", {product})
}
const profileView = async (req,res) => {
    const { user } = req
    res.status(200).render("profile", {user})
}

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
    }
}

const viewsRouter = new ViewsRouter().getRouter()

export default viewsRouter