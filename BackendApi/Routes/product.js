const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken")
const Product = require("../Models/Product")
const CryptoJS = require("crypto-js")


//create new product


router.post("/", verifyTokenAndAdmin, async (req, res) => {


    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    }
    catch (err) {
        res.status(500).json(err)

    }


})

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })



        return res.status(200).json(updatedProduct)
    }
    catch (err) {
        return res.status(500).json(err)

    }
})

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {

        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product deleted successfully");



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


//get one product

router.get("/:id", async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json("Product not found!")
        }

        return res.status(200).json(product)



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


//get all the products
router.get("/", async (req, res) => {

    const newProduct = req.query.newProduct
    const category = req.body.category

    try {
        let products;
        if (newProduct) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        }
        if (category) {
            products = await Product.find({
                categories: {
                    $in: [category]
                }
            })

        }
       
            products = await Product.find()
        
     
        return res.status(200).json(products)


      


    }
    catch (err) {
        return res.status(500).json(err)
    }


})





module.exports = router