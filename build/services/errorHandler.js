"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(500).json({
                message: "internal error",
                errorKaayo: err.message
            });
        });
    };
};
exports.default = errorHandler;
