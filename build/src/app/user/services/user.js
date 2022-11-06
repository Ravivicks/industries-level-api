"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserServices = exports.findAndUpdateUserServices = exports.findUserServices = exports.createUserServices = void 0;
const user_1 = __importDefault(require("../models/user"));
const createUserServices = (input) => {
    return user_1.default.create(input);
};
exports.createUserServices = createUserServices;
const findUserServices = (query, options = { learn: true }) => {
    return user_1.default.find(query, {}, options);
};
exports.findUserServices = findUserServices;
const findAndUpdateUserServices = (query, update, options = { learn: true }) => {
    return user_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateUserServices = findAndUpdateUserServices;
const deleteUserServices = (query) => {
    return user_1.default.deleteOne(query);
};
exports.deleteUserServices = deleteUserServices;
