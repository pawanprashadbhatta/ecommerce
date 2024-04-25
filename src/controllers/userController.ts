
import User from "../database/models/userModel";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
class AuthController{
public static async registerUser(req:Request,res:Response):Promise<void>{
const {userName,email,password}=req.body
if(!userName||!email||!password){
res.status(400).json({
    message:"please provide asked details."
})
return
}
await User.create({
    userName,
    email,
    password:bcrypt.hashSync(password,10)
})
res.status(200).json({
    message:"user registered successfully.."
})
}

}
export default AuthController