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
exports.Role = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../database/models/userModel"));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Customer"] = "customer";
})(Role || (exports.Role = Role = {}));
class AuthMiddleware {
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get token from user 
            const token = req.headers.authorization;
            if (!token || token === undefined) {
                res.status(403).json({
                    message: "Token not provided"
                });
                return;
            }
            // verify token if it it is legit or tampered 
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(403).json({
                        message: "Invalid Token"
                    });
                }
                else {
                    // check if that decoded object id user exist or not
                    try {
                        const userData = yield userModel_1.default.findByPk(decoded.id);
                        if (!userData) {
                            res.status(404).json({
                                message: "No user with that token"
                            });
                            return;
                        }
                        req.user = userData;
                        next();
                    }
                    catch (error) {
                        res.status(500).json({
                            message: "Something went wrong"
                        });
                    }
                }
            }));
        });
    }
    restrictTo(...roles) {
        return (req, res, next) => {
            var _a;
            let userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
            console.log(userRole);
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: "you don't have permission"
                });
            }
            else {
                next();
            }
        };
    }
}
exports.default = new AuthMiddleware();
//export garda instantation garyeu object banyera so static lekne jarurat vayena like in usermodel
