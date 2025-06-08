import dbConnect from "../helpers/dbConnect.helper.js"
const {PERSISTENCE} = process.env

let dao = {}

switch (PERSISTENCE){
    case"memory":{
        const {productManager,cartManager,userManager} = await import("./memory/dao.memory.js")
        dao = {productManager,cartManager,userManager}
    }
    break
    case"fs":{
        const {productManager,cartManager,userManager} = await import("./fs/dao.fs.js")
        dao = {productManager,cartManager,userManager}
    }
    break
    default:{
        await dbConnect(process.env.LINK_DB);
        const {productManager,cartManager,userManager} = await import("./mongo/dao.mongo.js")
        dao = {productManager,cartManager,userManager}
    }
    break
}
const {productManager,cartManager,userManager} = dao
export {productManager,cartManager,userManager}
export default dao