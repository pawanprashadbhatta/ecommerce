import express,{Application,Request,Response } from "express"
import "./model/index"
const app:Application=express()
const PORT=3000
app.get("/",(req:Request,res:Response)=>{
    res.send("hello ts programmer")
})
app.get("/contactUs",(req:Request,res:Response)=>{
    res.send("hello ts programmer contact us")
})
app.get("/about",(req:Request,res:Response)=>{
    res.send("hello ts programmer about us")
})

app.listen(PORT,()=>{
    console.log("server is started at port 3000 successfully")
})