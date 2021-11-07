const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken")
const Cart = require("../Models/Cart")

//create new cart


router.post("/", verifyToken, async (req, res) => {


    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)

    }
    catch (err) {
        res.status(500).json(err)

    }


})

//update a cart
router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {

    try {
        const updatedCart = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })



        return res.status(200).json(updatedCart)
    }
    catch (err) {
        return res.status(500).json(err)

    }
})

//delete/empty a cart

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {

    try {

        const deleteCart = await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json("Cart deleted successfully");



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


//get one cart

router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {

    try {

        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json("cart not found!")
        }

        return res.status(200).json(cart)



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


// //get all the products
router.get("/", verifyTokenAndAdmin, async (req, res) => {



    try {
        let products;


        const carts = await Cart.find()


        return res.status(200).json(carts)





    }
    catch (err) {
        return res.status(500).json(err)
    }


})





module.exports = router