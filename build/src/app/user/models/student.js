"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    rollNumber: {
        type: String
    },
    studentClass: {
        type: String
    },
    collageName: {
        type: String
    },
    courseName: {
        type: String
    },
    userId: {
        type: String
    },
}, { versionKey: false });
const StudentModel = (0, mongoose_1.model)('Student', studentSchema);
exports.default = StudentModel;
