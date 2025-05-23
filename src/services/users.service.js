import { userManager } from "../data/managers/manager.mongo.js"

const createOneService = async(data) => await userManager.createOne(data)
const readAllService = async(filter) => await userManager.readAll(filter)
const readByIdService = async(id) => await userManager.readById(id)
const updateByIdService = async(id,data) => await userManager.updateById(id,data)
const deleteByIdService = async(id) => await userManager.deleteById(id)

export {createOneService, readAllService, readByIdService, updateByIdService, deleteByIdService}