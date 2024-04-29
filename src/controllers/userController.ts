
import User from "../database/models/userModel";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
class AuthController{
public static async registerUser(req:Request,res:Response):Promise<void>{
    const {userName,email,password,role}=req.body
    if(!userName||!email||!password){
    res.status(400).json({
        message:"please provide asked details."
    })
    return
    }
    const emailexist=User.findAll({
        where:{
            email:email
        }
        
    })
    if((await emailexist).length>0){
        res.status(400).json({
            messsage:"user with that email already exist"
        })
        return
        
    }
    await User.create({
        userName,
        email,
        password:bcrypt.hashSync(password,10),
        role:role
    })
     res.status(200).json({
        message:"user registered successfully.."
    })  
}

//login user
public static async loginUser(req:Request,res:Response):Promise<void>{
    //input required
    const {email,password}=req.body
    if(!email ||!password){
res.status(400).json({
    message:"Please provide  correct email and password"
})
return
    }
    //check if provided email registered or not
    const [data]= await User.findAll({
        where:{
            email:email
        }   
    })
    if(!data){
        res.status(400).json({
            message:"please registered first."
        })
        return
    }
    //check password now
    const isMatched=bcrypt.compareSync(password,data.password)

if (!isMatched){
res.status(403).json({
    message:"please provide correct email or password"
})
return
}
//generate token if ismatched
const token=jwt.sign({id:data.id},process.env.SECRET_KEY as string,{expiresIn:"20d"})
res.status(200).json({
    message:"Logged in successful",
    data:token
})



}



}
export default AuthController