"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const userModel_1 = __importDefault(require("./models/userModel"));
const productModel_1 = __importDefault(require("./models/productModel"));
const categoryModel_1 = __importDefault(require("./models/categoryModel"));
const sequelize_typescript_1 = require("sequelize-typescript");
dotenv.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/models"]
});
sequelize.authenticate()
    .then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
});
sequelize.sync({ force: false }).then(() => {
    console.log("synced..");
});
//relationships here
userModel_1.default.hasMany(productModel_1.default, { foreignKey: "userId" });
productModel_1.default.belongsTo(userModel_1.default, { foreignKey: "userId" });
productModel_1.default.belongsTo(categoryModel_1.default, { foreignKey: "categoryId" });
categoryModel_1.default.hasOne(productModel_1.default, { foreignKey: "categoryId" });
exports.default = sequelize;
