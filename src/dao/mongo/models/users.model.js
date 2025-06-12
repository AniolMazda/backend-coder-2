import {Schema,model} from "mongoose"

const userSchema = new Schema(
    {
        name:String,
        date:Date,
        city:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/266/266033.png"
        },
        role:{
            type: String,
            default: "USER",
            enum: ["USER", "ADMIN", "PREM"],
            index:true
        },
        isVerify:{
            type:Boolean,
            default:false
        },
        verifyCode:String
    },
    {
        timestamps:true
    }
)

export const userModel = model(
    "users",
    userSchema
)