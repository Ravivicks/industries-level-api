"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherSchema = new mongoose_1.Schema({
    organizationId: {
        type: String
    },
    TeacherSubject: {
        type: String
    },
    batch: {
        type: String
    },
    specialization: {
        type: String
    },
    userId: {
        type: String
    },
}, { versionKey: false });
const TeacherModel = (0, mongoose_1.model)('Teacher', teacherSchema);
exports.default = TeacherModel;
