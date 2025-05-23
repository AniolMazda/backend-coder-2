import { createOneService, readAllService, readByIdService, updateByIdService, deleteByIdService } from "../services/products.service.js"

const createOne = async (req,res) => {
    const {_id} = req.user
    const data = req.body
    data.owner_id = _id
    const response = await createOneService(data)
    res.json201(response,"Created Product")
}
const readAll = async (req,res) => {
    const filter = req.query
    const response = await readAllService(filter)
    if(response.length === 0){
        res.json404()
    }
    res.json200(response)
}
const readById = async (req,res) => {
    const { pid } = req.params
    const response = await readByIdService(pid)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response)
}
const updateById = async (req,res) => {
    const { pid } = req.params
    const data = req.body
    const response = await updateByIdService(pid,data)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response,"Update Product")
}
const deleteById = async (req,res) => {
    const { pid } = req.params
    const response = await deleteByIdService(pid)
    if(!response){
        res.json404("Not Found Product")
    }
    res.json200(response,"Delete Product")
}

export {createOne,readAll,readById,updateById,deleteById}