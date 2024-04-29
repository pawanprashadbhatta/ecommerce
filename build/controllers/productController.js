"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../database/models/productModel"));
const userModel_1 = __importDefault(require("../database/models/userModel"));
const categoryModel_1 = __importDefault(require("../database/models/categoryModel"));
class productController {
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(req.user);
            let fileName;
            if (req.file) {
                fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            }
            else {
                fileName = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lTmSRLPfVUJxz76w1rT8eQHaEX%26pid%3DApi&f=1&ipt=f7dfc673fa41252358002addf8ea8aaece489179a58361ee3334f4a00d0c91c3&ipo=images";
            }
            const { productName, productDescription, productPrice, ProductTotalQty, categoryId } = req.body;
            if (!productName || !productDescription || !productPrice || !ProductTotalQty || !categoryId) {
                res.status(400).json({
                    message: "please provide all required prodect information ..."
                });
                return;
            }
            yield productModel_1.default.create({
                productName,
                productDescription,
                productPrice,
                ProductTotalQty,
                ProductImageUrl: fileName,
                categoryId
            });
            res.status(200).json({
                message: "product created successfully.."
            });
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield productModel_1.default.findAll({
                include: [
                    { model: userModel_1.default,
                        attributes: ["id", "email", "userName"]
                    },
                    { model: categoryModel_1.default,
                        attributes: ["id", "categoryName"]
                    }
                ]
            });
            res.status(200).json({
                message: "products fetched successfully",
                data
            });
        });
    }
}
exports.default = new productController();
