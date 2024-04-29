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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
require("./database/connection");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const adminseeder_1 = __importDefault(require("./services/adminseeder"));
const categoryController_1 = __importDefault(require("./controllers/categoryController"));
const app = (0, express_1.default)();
const PORT = 3000;
//env file import and config before use
dotenv.config();
app.use(express_1.default.json());
//admin seedding
(0, adminseeder_1.default)();
app.use('', userRoutes_1.default);
app.use('', productRoute_1.default);
app.get("/", (req, res) => {
    res.send("hello ts programmer");
});
app.listen(PORT, () => {
    categoryController_1.default.seedCategory();
    console.log("server is started at port 3000 successfully");
});
