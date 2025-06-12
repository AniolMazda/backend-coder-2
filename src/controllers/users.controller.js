import { readAllService,readByIdService,updateByIdService, deleteByIdService } from "../services/users.service.js"
import {sendEmail} from "../helpers/email.helper.js"

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

export {readAll,readById,updateById,deleteById,sendEmails}