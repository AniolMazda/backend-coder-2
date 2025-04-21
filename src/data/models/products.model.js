import {Schema,Types,model} from "mongoose"

const productSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
            index:true
        },
        description: String,
        category:{
            type:String,
            default:"Uncategorized",
            enum:["CDs","LPs","Shirts","Hoodies"],
            index:true
        },
        image:{
            type:String,
            default:"https://www.pexels.com/es-es/foto/disco-cd-disco-compacto-de-cerca-5473308/"
        },
        price:{
            type:Number,
            required:true
        },
        code:{
            type:String,
            required:true,
            unique:true
        },
        stock:{
            type:Number,
            default:0
        },
        onsale:{
            type: Boolean,
            default: false
        },
        owner_id:{
            type: Types.ObjectId,
            ref: "users",
            index: true
        }
    },
    {
        timestamps:true
    }
)

productSchema.pre(/^find/, function () {
    this.populate("owner_id", "email avatar");
});

export const productModel = model(
    "products",
    productSchema
)