import User from "../database/models/userModel"

import bcrypt from "bcrypt"
const adminSheeder=async():Promise<void>=>{
const [data]=await User.findAll({
    where:{
        email:"admin@gmail.com"
    }
})
if(!data){
    await User.create({
        email:"admin@gmail.com",
        password:bcrypt.hashSync("admin",8),
        role:"admin",
        userName:"pawanAdmin"
    })
    console.log("admin seeded successfully")
}else{
    console.log("admin already seeded")
}

}
export default adminSheeder