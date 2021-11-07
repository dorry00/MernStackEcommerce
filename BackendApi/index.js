const express =require("express")
const mongoose= require("mongoose")
const app= express()
const dotenv = require("dotenv");
dotenv.config()
const userRoute = require("./Routes/user")
const authRoute = require("./Routes/auth")
const productRoute = require("./Routes/product")
const cartRoute = require("./Routes/cart")
const orderRoute = require("./Routes/order")
const payRoute = require("./Routes/stripe")


//accept json data

app.use(express.json())


//connect MongoDb
mongoose.connect(process.env.MONGO_URL)
.then(()=>
    console.log("MongoDb connected successfully")
)
.catch(err =>{
    console.log(err)
})

//api routing
app.use("/api/users", userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/pay",payRoute);



app.listen((process.env.PORT || 5000), ()=>{
    console.log(`Backend at ${port}`)
})