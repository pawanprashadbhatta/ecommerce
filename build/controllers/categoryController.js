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
const categoryModel_1 = __importDefault(require("../database/models/categoryModel"));
class categoryController {
    constructor() {
        this.categorydata = [
            { categoryName: "Electronics" },
            { categoryName: "cusmetics" },
            { categoryName: "groceries" },
            { categoryName: "clothses" }
        ];
    }
    seedCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const datas = yield categoryModel_1.default.findAll();
            if ((datas.length) === 0) {
                const data = yield categoryModel_1.default.bulkCreate(this.categorydata);
                console.log("categoriees seeded succesfully.");
            }
            else {
                console.log("categories already seeded");
            }
        });
    }
}
exports.default = new categoryController();
