import {Table,Column, Model,DataType,  CreatedAt, PrimaryKey} from "sequelize-typescript"

@Table({
    tableName:"users",
    modelName:"User",
    timestamps:true
})

class User extends Model{
    @Column({
        primaryKey :true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4

    })
    declare id:String
    @Column({
       type:DataType.STRING

    })
    declare userName:string;
    @Column({
        type:DataType.STRING
 
     })
     declare email:string;
     @Column({
        type:DataType.STRING
 
     })
     declare password:string;
}
export default User