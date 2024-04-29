import Category from "../database/models/categoryModel"


class categoryController{
categorydata=[
   { categoryName:"Electronics"},
   { categoryName:"cusmetics"},
   { categoryName:"groceries"},
   { categoryName:"clothses"}
]

    async seedCategory():Promise<void>{
const datas=await Category.findAll()
if(( datas.length)===0){
    const data=await Category.bulkCreate(this.categorydata)
    console.log("categoriees seeded succesfully.")
}else{
    console.log("categories already seeded")
}
    }
}
export default new categoryController()