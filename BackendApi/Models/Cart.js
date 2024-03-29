const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
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
  
   
}, { timestamps: true }, { collection: "cart" });

module.exports = mongoose.model("Cart", CartSchema)