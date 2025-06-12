import usersRepository from "../repositories/users.repository.js"

const createOneService = async(data) => await usersRepository.createOne(data)
const readAllService = async(filter) => await usersRepository.readAll(filter)
const readByService = async(filter) => await usersRepository.readBy(filter)
const readByIdService = async(id) => await usersRepository.readById(id)
const updateByIdService = async(id,data) => await usersRepository.updateById(id,data)
const deleteByIdService = async(id) => await usersRepository.deleteById(id)

export {createOneService, readAllService, readByService, readByIdService, updateByIdService, deleteByIdService}