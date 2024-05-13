import * as dotenv from "dotenv"

import User from "./models/userModel";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import { Sequelize } from "sequelize-typescript";
import Cart from "./models/cartModel";
import Order from "./models/orderModel";
import OrderDetail from "./models/orderDetailModel";
import Payment from "./models/paymentModel";

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

// order-orderdetail relation
Order.hasMany(OrderDetail,{foreignKey:'orderId'})
OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

// orderdetail-product relation 
Product.hasMany(OrderDetail,{foreignKey:'productId'})
OrderDetail.belongsTo(Product,{foreignKey:'productId'})

//order-payment relation 
Payment.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(Payment,{foreignKey:'paymentId'})

//order-user relation 
User.hasMany(Order,{foreignKey : 'userId'})
Order.belongsTo(User,{foreignKey : 'userId'})

export default sequelize
