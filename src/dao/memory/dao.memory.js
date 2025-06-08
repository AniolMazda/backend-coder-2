class DaoMemory{
    constructor (){}
    createOne = async (data) => {}
    readAll = async (filter) => {}
    readById = async (id) => {}
    readBy = async (filter) => {}
    updateById = async (id,data) => {}
    deleteById = async (id) => {}
}

const productManager = new DaoMemory()
const cartManager = new DaoMemory()
const userManager = new DaoMemory()

export {productManager,cartManager,userManager}