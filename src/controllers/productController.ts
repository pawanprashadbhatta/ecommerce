import { Request,Response } from "express"
import Product from "../database/models/productModel"
import { AuthRequest } from '../middleware/authMiddleware'
import User from "../database/models/userModel";
import Category from "../database/models/categoryModel";

class productController{
    
  async addProduct(req:AuthRequest,res:Response):Promise<void>{
  
    let fileName;
    if(req.file){
        fileName=req.file?.filename
    }else{
        fileName="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lTmSRLPfVUJxz76w1rT8eQHaEX%26pid%3DApi&f=1&ipt=f7dfc673fa41252358002addf8ea8aaece489179a58361ee3334f4a00d0c91c3&ipo=images"
    }
    const {productName,productDescription,productPrice,productTotalQty,categoryId}=req.body
    console.log(req.body)
    if(!productName||!productDescription||!productPrice||!productTotalQty||!categoryId){
        res.status(400).json({
            message:"please provide all required product information ..."
        })
        return
    }
    await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalQty,
        productImageUrl:fileName,
        categoryId
    })
    res.status(200).json({
        message:"product created successfully.."
    })
  }
  async getProduct(req:Request,res:Response):Promise<void>{
const data=await Product.findAll(
    {
        include:
           [
            { model:User,
            attributes:["id","email","userName"]
            },
            { model:Category,
                attributes:["id","categoryName"]
                }
        ]
    }
)

res.status(200).json({
    message:"products fetched successfully",
    data
})
  }

}
export default new productController()