import { readAllService,readByIdService,updateByIdService, deleteByIdService,readByService } from "../services/users.service.js"
import {sendEmail} from "../helpers/email.helper.js"
import { compareHash, createHash } from "../helpers/hash.helper.js"
import resetPasswordEmail from "../helpers/resetPassword.helper.js"

const readAll = async (req,res) => {
    const filter = req.query
    const response = await readAllService(filter)
    if(response.length === 0){
        res.json404("User Not Found")
    }
    res.json200(response)
}
const readById = async (req,res) => {
    const { uid } = req.params
    const response = await readByIdService(uid)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response)
}
const updateById = async (req,res) => {
    const { _id } = req.user
    const data = req.body
    const response = await updateByIdService(_id,data)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response, "Updated User")  
}
const deleteById = async (req,res) => {
    const { _id } = req.user
    const response = await deleteByIdService(_id)
    if(!response){
        res.json404("User Not Found")
    }
    res.json200(response, "Deleted User")  
}
const sendEmails = async (req,res) => {
    const {email} = req.params
    const response = await sendEmail(email)
    res.json200(response, "Email Send")  
}
const recoveryPassword = async(req,res) => {
    const {email} = req.params
    const user = await readByService({email})
    if(!user){
        return res.json404()
    }
    await resetPasswordEmail(email)
    res.cookie("recovery",email,{maxAge:60 * 60 * 1000}).json200(user,"Send Recovery Email!")
        
}
const resetPasswordCb = async(req,res) => {
    const {email} = req.params
    const data = req.body
    const user = await readByService({email})
    if(!user){
        return res.json404("User Not Found")
    }
    const verifyPass = compareHash(data.password,user.password)
    if(verifyPass){
        return res.json400("Bad Credentials")
    }
    const newPass = {password:createHash(data.password)}
    const response = await updateByIdService(user._id,newPass)
    res.clearCookie("recovery").json200(response, "Updated User")
}

export {readAll,readById,updateById,deleteById,sendEmails,recoveryPassword,resetPasswordCb}