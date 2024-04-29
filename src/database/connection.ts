import * as dotenv from "dotenv"

import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import { Sequelize } from "sequelize-typescript";
import Cart from "./models/cartModel";

dotenv.config()
const sequelize= new Sequelize({  
    database:process.env.DB_NAME,
dialect:"mysql",
username:process.env.DB_USERNAME,
password:process.env.DB_PASSWORD,
host:process.env.DB_HOST,
port: Number(process.env.DB_PORT),
models:[__dirname + "/models"]
  }

)
sequelize.authenticate()
.then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})
sequelize.sync({force:false}).then(()=>{
    console.log("synced..")
})

//relationships here
User.hasMany(Product,{foreignKey:"userId"})
Product.belongsTo(User,{foreignKey:"userId"})


Product.belongsTo(Category,{foreignKey:"categoryId"})
Category.hasOne(Product,{foreignKey:"categoryId"})

//productcart relation
Product.hasMany(Cart,{foreignKey:"productId"})
Cart.belongsTo(Product,{foreignKey:"productId"})

// cart user relation
User.hasMany(Cart,{foreignKey:"userId"})
Cart.belongsTo(User,{foreignKey:"userId"})

export default sequelize
