const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        required:true,
       
    },
   
   
}, { timestamps: true }, { collection: "products" });

module.exports = mongoose.model("Product", ProductSchema)