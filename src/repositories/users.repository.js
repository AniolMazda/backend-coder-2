import { userManager } from "../dao/factory.js"
import UsersDTO from "../dto/users.dto.js"

class UsersRepository{
    constructor(){
        this.manager = userManager
    }
    createOne = async(data) => await this.manager.createOne(new UsersDTO(data))
    readBy = async(filter) => await this.manager.readBy(filter)
    readAll = async(filter) => await this.manager.readAll(filter)
    readById = async(id) => await this.manager.readById(id)
    updateById = async(id,data) => await this.manager.updateById(id,data)
    deleteById = async(id) => await this.manager.deleteById(id)
}

const usersRepository = new UsersRepository()

export default usersRepository