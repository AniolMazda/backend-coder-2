import {Schema,Types,model} from "mongoose"

const cartSchema = new Schema(
    {
        selectedProduct:{
            type:[
                {
                    product:{
                        type:Types.ObjectId,
                        ref:"products",
                        required:true
                    },
                    quantity:{
                        type:Number,
                        default:1
                    },
                }
            ]
        },
        userId:{
            type: Types.ObjectId,
            ref: "users",
            required: true,
            index: true
        },
        state:{
            type: String,
            default: "reserved",
            enum: ["reserved", "paid", "delivered"],
            index: true
        }
    },
    {
        timestamps:true
    }
)

cartSchema.pre(/^find/, function () {
    this.populate("userId", "email avatar").populate("product", "title price stock");
});

export const cartModel = model(
    "carts",
    cartSchema
)