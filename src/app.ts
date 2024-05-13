import express,{Application,Request,Response } from "express"
import * as dotenv from "dotenv"
import  "./database/connection"
import userRoute from "./routes/userRoutes"
import productRoute from './routes/productRoute'
import adminSheeder from "./services/adminseeder"
import categoryController from "./controllers/categoryController"
import cartRoute from './routes/cartRoute'
import categoryRoute from './routes/categoryRoute'
const app:Application=express()
const PORT=3000
//env file import and config before use






dotenv.config()
app.use(express.json())
//admin seedding


adminSheeder()
app.use('',userRoute)
app.use('/admin/product',productRoute)
app.use('/customer/cart',cartRoute)
app.use('/admin/category',categoryRoute)
app.get("/",(req:Request,res:Response)=>{
    res.send("hello ts programmer")
})



app.listen(PORT,()=>{
    categoryController.seedCategory()
    console.log("server is started at port 3000 successfully")
})