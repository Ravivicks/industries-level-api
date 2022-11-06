"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentById = exports.deleteStudent = exports.updateStudent = exports.students = void 0;
const class_validator_1 = require("class-validator");
const response_object_1 = require("../../../utils/response-object");
const student_1 = require("../validators/student");
const student_2 = require("../services/student");
const students = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalDataCount = yield (0, student_2.findStudentServices)({}).count();
    yield (0, student_2.findStudentServices)({}).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no student found');
        }
        else {
            (0, response_object_1.successResponseArr)(res, data, {
                total: totalDataCount,
                current: data.length
            }, 'fetch Data successfully');
        }
    })).catch((error) => {
        (0, response_object_1.errorResponse)(res, error);
    });
});
exports.students = students;
const studentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, student_2.findStudentServices)({ userId: req.params.userId }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no student found');
        }
        else {
            (0, response_object_1.successResponse)(res, data, 'Student fetch successfully');
        }
    })).catch((error) => {
        (0, response_object_1.errorResponse)(res, error);
    });
});
exports.studentById = studentById;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const deleteStudentValidatorObj = new student_1.deleteStudentValidator();
    deleteStudentValidatorObj.userId = userId;
    (0, class_validator_1.validate)(student_1.deleteStudentValidator).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, student_2.deleteStudentServices)({
                userId: userId
            }).then((data) => {
                if (data.deletedCount == 0) {
                    (0, response_object_1.noContentResponse)(res, data, 'no student deleted');
                }
                else {
                    (0, response_object_1.successResponse)(res, data, 'Student deleted successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.deleteStudent = deleteStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rollNumber, studentClass, collageName, courseName, userId } = req.body;
    const updateStudentValidatorFn = new student_1.updateStudentValidator();
    // updateStudentValidatorFn.studentId = studentId,
    updateStudentValidatorFn.rollNumber = rollNumber;
    updateStudentValidatorFn.studentClass = studentClass;
    updateStudentValidatorFn.collageName = collageName;
    updateStudentValidatorFn.courseName = courseName;
    updateStudentValidatorFn.userId = userId;
    (0, class_validator_1.validate)(updateStudentValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, student_2.findAndUpdateStudentServices)({
                userId: userId
            }, {
                rollNumber: rollNumber,
                studentClass: studentClass,
                collageName: collageName,
                courseName: courseName,
            }).then((student) => {
                if (!student) {
                    (0, response_object_1.noContentResponse)(res, student, 'no user updated');
                }
                else {
                    (0, response_object_1.successResponse)(res, student, 'User updated successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.updateStudent = updateStudent;
