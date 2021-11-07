const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products:[
        {
            productId:{
                type:String,
                required:true,
                unique:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
                
            }

        }
    ],
    amount:{type:Number, required},
    address:{type:Object,required},
    status:{type:String,default:"pending"}
   
}, { timestamps: true }, { collection: "orders" });

module.exports = mongoose.model("Order", orderSchema)