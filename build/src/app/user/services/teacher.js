"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacherServices = exports.findAndUpdateTeacherServices = exports.findTeacherServices = exports.createTeacherServices = void 0;
const teacher_1 = __importDefault(require("../models/teacher"));
const createTeacherServices = (input) => {
    return teacher_1.default.create(input);
};
exports.createTeacherServices = createTeacherServices;
const findTeacherServices = (query, options = { learn: true }) => {
    return teacher_1.default.find(query, {}, options);
};
exports.findTeacherServices = findTeacherServices;
const findAndUpdateTeacherServices = (query, update, options = { learn: true }) => {
    return teacher_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateTeacherServices = findAndUpdateTeacherServices;
const deleteTeacherServices = (query) => {
    return teacher_1.default.deleteOne(query);
};
exports.deleteTeacherServices = deleteTeacherServices;
