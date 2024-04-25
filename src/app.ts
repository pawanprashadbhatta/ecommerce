import express,{Application,Request,Response } from "express"

const app:Application=express()
const PORT=3000
//env file import and config before use
import * as dotenv from "dotenv"
import  "./database/connection"
dotenv.config()
app.use(express.json())
import userRoute from "./routes/userRoutes"
app.use('',userRoute)
app.get("/",(req:Request,res:Response)=>{
    res.send("hello ts programmer")
})



app.listen(PORT,()=>{
    console.log("server is started at port 3000 successfully")
})