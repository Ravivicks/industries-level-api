"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdatePasswordServices = exports.findOtpServices = exports.checkResetPasswordService = exports.generateResetPasswordService = void 0;
const user_1 = __importDefault(require("../../user/models/user"));
const authentication_1 = __importDefault(require("../models/authentication"));
const generateResetPasswordService = (input) => {
    return authentication_1.default.create(input);
};
exports.generateResetPasswordService = generateResetPasswordService;
const checkResetPasswordService = (query, options = { learn: true }) => {
    return authentication_1.default.find(query, {}, options);
};
exports.checkResetPasswordService = checkResetPasswordService;
const findOtpServices = (query, options = { learn: true }) => {
    return authentication_1.default.find(query, {}, options);
};
exports.findOtpServices = findOtpServices;
const findAndUpdatePasswordServices = (query, update, options = { learn: true }) => {
    return user_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdatePasswordServices = findAndUpdatePasswordServices;
