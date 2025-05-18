import RouterHelper from "../../helpers/router.helper.js"
import passportCb from "../../middlewares/passportCb.mid.js"

const registerCb = async (req,res) => {
    const { _id } = req.user
    res.json201(_id,"Registered")
}
const loginCb = async (req,res) => {
    const { _id,token } = req.user
    res.cookie("token",token,{maxAge:24 * 60 * 60 * 1000})
        .json200(_id,"Logged In")
}
const loginGoogle = async (req,res) => {
    const { token } = req.user
    res.status(200)
        .cookie("token",token,{maxAge:24 * 60 * 60 * 1000})
        .redirect('/')
}
const signoutCb = (req, res) => {
    res.clearCookie("token").json200(req.user._id,"Sign Out")
}
const onlineCb = (req, res) => res.json200(null,"Is Online")
const badAuth = (req,res) => res.json401()
const forbidden = (req, res) => res.json403()

class AuthRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = () => {
        this.create("/register",["PUBLIC"],passportCb("register"),registerCb)
        this.create("/login",["PUBLIC"],passportCb("login"),loginCb)
        this.create("/online",["USER","ADMIN"],onlineCb)
        this.create("/signout",["USER","ADMIN"],signoutCb)
        this.read("/google",["PUBLIC"],passportCb("google",{scope:["email","profile"]}))
        this.read("/google/redirect",["PUBLIC"],passportCb("google"),loginGoogle)
        this.read("/bad-auth",["PUBLIC"],badAuth)
        this.read("/forbidden",["PUBLIC"],forbidden)
    }
}

const authRouter = new AuthRouter().getRouter()
export default authRouter