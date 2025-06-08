import productsRepository from "../repositories/products.repository.js"

const createOneService = async(data) => await productsRepository.createOne(data)
const readAllService = async(filter) => await productsRepository.readAll(filter)
const readByIdService = async(id) => await productsRepository.readById(id)
const updateByIdService = async(id,data) => await productsRepository.updateById(id,data)
const deleteByIdService = async(id) => await productsRepository.deleteById(id)

export {createOneService, readAllService, readByIdService, updateByIdService, deleteByIdService}