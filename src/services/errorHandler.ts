
import { Request,Response, NextFunction } from "express"
const errorHandler= (fn:Function)=>{
return(req:Request,res:Response,next:NextFunction)=>{
    fn(req,res,next).catch((err:Error)=>{
        res.status(500).json({
            message:"internal error",
            errorKaayo:err.message
        })
    })

    
}
}
export default errorHandler