"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudentServices = exports.findAndUpdateStudentServices = exports.findStudentServices = exports.createStudentServices = void 0;
const student_1 = __importDefault(require("../models/student"));
const createStudentServices = (input) => {
    return student_1.default.create(input);
};
exports.createStudentServices = createStudentServices;
const findStudentServices = (query, options = { learn: true }) => {
    return student_1.default.find(query, {}, options);
};
exports.findStudentServices = findStudentServices;
const findAndUpdateStudentServices = (query, update, options = { learn: true }) => {
    return student_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateStudentServices = findAndUpdateStudentServices;
const deleteStudentServices = (query) => {
    return student_1.default.deleteOne(query);
};
exports.deleteStudentServices = deleteStudentServices;
