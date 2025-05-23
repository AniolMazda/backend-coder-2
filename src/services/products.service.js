import { productManager } from "../data/managers/manager.mongo.js"

const createOneService = async(data) => await productManager.createOne(data)
const readAllService = async(filter) => await productManager.readAll(filter)
const readByIdService = async(id) => await productManager.readById(id)
const updateByIdService = async(id,data) => await productManager.updateById(id,data)
const deleteByIdService = async(id) => await productManager.deleteById(id)

export {createOneService, readAllService, readByIdService, updateByIdService, deleteByIdService}