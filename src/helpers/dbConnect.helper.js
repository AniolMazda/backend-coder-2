import { connect } from "mongoose";

const dbConnect = async (link) => {
    try{
        await connect(link)
        console.log("mongo database connect")
    }
    catch(error){
        console.error(error)
    }
}

export default dbConnect