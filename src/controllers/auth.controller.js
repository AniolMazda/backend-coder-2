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

export {registerCb,loginCb,loginGoogle,signoutCb,onlineCb,badAuth,forbidden}