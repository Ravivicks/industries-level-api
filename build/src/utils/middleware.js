"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_object_1 = require("./response-object");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signature = process.env.JWTSIGN;
const authMiddleware = (req, res, next) => {
    const { token } = req.headers;
    if (token) {
        jsonwebtoken_1.default.verify(token, signature, function (err, decoded) {
            if (err) {
                (0, response_object_1.errorResponse)(res, err);
            }
            else {
                if (decoded === null || decoded === void 0 ? void 0 : decoded.userId) {
                    next();
                }
                else {
                    (0, response_object_1.errorResponse)(res, {}, 'invalid token, somthing went wrong with token decoded');
                }
            }
        });
    }
    else {
        (0, response_object_1.errorResponse)(res, {}, 'token not presents in headers');
    }
};
exports.authMiddleware = authMiddleware;
