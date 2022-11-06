"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controllers/authentication");
const router = express_1.default.Router();
router.post('/login-user', authentication_1.loginUser);
router.post('/forgot-password', authentication_1.forgotPassword);
router.post('/verify-otp', authentication_1.verifyOtp);
router.post('/reset-password', authentication_1.resetPassword);
exports.default = router;
