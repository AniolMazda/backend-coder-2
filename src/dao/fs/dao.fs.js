class DaoFS{
    constructor (){}
    createOne = async (data) => {}
    readAll = async (filter) => {}
    readById = async (id) => {}
    readBy = async (filter) => {}
    updateById = async (id,data) => {}
    deleteById = async (id) => {}
}

const productManager = new DaoFS()
const cartManager = new DaoFS()
const userManager = new DaoFS()

export {productManager,cartManager,userManager}