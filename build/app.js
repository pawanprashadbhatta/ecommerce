"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./model/index");
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("hello ts programmer");
});
app.get("/contactUs", (req, res) => {
    res.send("hello ts programmer contact us");
});
app.get("/about", (req, res) => {
    res.send("hello ts programmer about us");
});
app.listen(PORT, () => {
    console.log("server is started at port 3000 successfully");
});
