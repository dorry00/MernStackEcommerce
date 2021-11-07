const router = require("express").Router()
const { verifyToken, verifyTokenAndAuthorisation, verifyTokenAndAdmin } = require("./verifyToken")
const Order = require("../Models/Order")

//create new order


router.post("/", verifyToken, async (req, res) => {


    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)

    }
    catch (err) {
        res.status(500).json(err)

    }


})

//update an order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })



        return res.status(200).json(updatedOrder)
    }
    catch (err) {
        return res.status(500).json(err)

    }
})

//delete/empty a cart

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {

        const deleteOrder = await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order deleted successfully");



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


//get user orders

router.get("/find/:userId", verifyTokenAndAuthorisation, async (req, res) => {

    try {

        const orders = await Order.find({ userId: req.params.userId });
        if (!orders) {
            return res.status(404).json("No orders yet")
        }

        return res.status(200).json(orders)



    }
    catch (err) {
        return res.status(500).json(err)
    }


})


// //get all the products
router.get("/", verifyTokenAndAdmin, async (req, res) => {



    try {
       


        const orders = await Order.find()


        return res.status(200).json(orders )





    }
    catch (err) {
        return res.status(500).json(err)
    }


})

//get monthly income
router.get("/income", verifyTokenAndAdmin, async(req,res)=>{

    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const prevMonth = new Date( new Date().setMonth(lastMonth.getMonth() - 1))
})
try {

    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: prevMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales:"$amount"
            }
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ])
    return res.status(200).json(income)



}
catch (err) {
    return res.status(500).json(err)
}





module.exports = router