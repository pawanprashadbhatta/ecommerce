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
const userModel_1 = __importDefault(require("../database/models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, email, password, role } = req.body;
            if (!userName || !email || !password) {
                res.status(400).json({
                    message: "please provide asked details."
                });
                return;
            }
            const emailexist = userModel_1.default.findAll({
                where: {
                    email: email
                }
            });
            if ((yield emailexist).length > 0) {
                res.status(400).json({
                    messsage: "user with that email already exist"
                });
                return;
            }
            yield userModel_1.default.create({
                userName,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                role: role
            });
            res.status(200).json({
                message: "user registered successfully.."
            });
        });
    }
    //login user
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //input required
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    message: "Please provide  correct email and password"
                });
                return;
            }
            //check if provided email registered or not
            const [data] = yield userModel_1.default.findAll({
                where: {
                    email: email
                }
            });
            if (!data) {
                res.status(400).json({
                    message: "please registered first."
                });
                return;
            }
            //check password now
            const isMatched = bcrypt_1.default.compareSync(password, data.password);
            if (!isMatched) {
                res.status(403).json({
                    message: "please provide correct email or password"
                });
                return;
            }
            //generate token if ismatched
            const token = jsonwebtoken_1.default.sign({ id: data.id }, "JWTSECRETKEY", { expiresIn: "20d" });
            res.status(200).json({
                message: "Logged in successful",
                data: token
            });
        });
    }
}
exports.default = AuthController;
