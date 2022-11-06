"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
// router.post('/create-student', createStudent);
router.delete('/delete-student', student_1.deleteStudent);
router.put('/update-student', student_1.updateStudent);
router.get('/students', student_1.students);
router.get('/students/:userId', student_1.studentById);
exports.default = router;
