"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_1 = require("../controllers/teacher");
const router = express_1.default.Router();
router.delete('/delete-teacher', teacher_1.deleteTeacher);
router.put('/update-teacher', teacher_1.updateTeacher);
router.get('/teachers', teacher_1.teachers);
router.get('/teachersbyid/:userId', teacher_1.teacherById);
exports.default = router;
