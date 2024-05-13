import Cart from "../database/models/cartModel";
import Category from "../database/models/categoryModel";
import Product from "../database/models/productModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { Response } from "express";

class cartController{
async addToCart(req:AuthRequest,res:Response):Promise<void>{
    const userId=req.user?.id
    const{quantity,productId}=req.body
    if(!productId||!quantity){
        res.status(400).json({
message:"please provide quantity and prodductId"
        })
    }
    //check if the product already in cart
    let cartItem=await Cart.findOne({
        where:{
            productId,
            userId
        }

    })
    if(cartItem){
        cartItem.quantity +=quantity
        await cartItem.save()
    }else{
        //insert to cart
     const cartItem  = await Cart.create({
            productId,
            userId,
            quantity
        })
        res.status(200).json({
            message:"product added to cart successfully"
        })
    }
}
async getMyCarts(req:AuthRequest,res:Response):Promise<void>{
    const userId = req.user?.id
    const cartItems  = await Cart.findAll({
        where : {
            userId
        },
        include : [
        {
            model : Product,
            include : [
            {
                model : Category,
                attributes : ['id','categoryName']
            }
            ]
        }
        ]
    })
    if(cartItems.length ===  0 ){
        res.status(404).json({
            message : "No item in the cart"
        })
    }else{
        res.status(200).json({
            message : "Cart items fetched succesfully",
            data : cartItems
        })
    }
}
async deleteMyCartItem(req:AuthRequest,res:Response) : Promise<void>{
    const userId = req.user?.id
    const {productId} = req.params 
    // check whether above productId product exist or not 
    const product = await Product.findByPk(productId)
    if(!product){
        res.status(404).json({
            message : "No product with that id"
        })
        return 
    }
    // delete that productId from userCart 
   await Cart.destroy({
        where : {
            userId, 
            productId
        }
    })
    res.status(200).json({
        message : "Product of cart deleted successfully"
    })
}

async updateCartItem(req:AuthRequest,res:Response):Promise<void>{
    const {productId} = req.params 
    const userId = req.user?.id 
    const {quantity} = req.body 
    if(!quantity){
        res.status(400).json({
            message : "Please provide quantity"
        })
        return
    }
    const cartData = await Cart.findOne({
        where : {
            userId,
            productId
        }
    })
   

    if(cartData){
    cartData.quantity = quantity 
    await cartData?.save()
    res.status(200).json({
        message : "Product of cart updated successfully",
        data : cartData
    })
    } else{
        res.status(404).json({
            message : "No productId of that userId"
        })
    }
   
}
}
export default new cartController()