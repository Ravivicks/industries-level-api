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
exports.teacherById = exports.deleteTeacher = exports.updateTeacher = exports.teachers = void 0;
const class_validator_1 = require("class-validator");
const response_object_1 = require("../../../utils/response-object");
const teacher_1 = require("../services/teacher");
const teacher_2 = require("../validators/teacher");
const teachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalDataCount = yield (0, teacher_1.findTeacherServices)({}).count();
    yield (0, teacher_1.findTeacherServices)({}).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no Teacher found');
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
exports.teachers = teachers;
const teacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, teacher_1.findTeacherServices)({ userId: req.params.userId }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no Teacher found');
        }
        else {
            (0, response_object_1.successResponse)(res, data, 'Teacher fetch successfully');
        }
    })).catch((error) => {
        (0, response_object_1.errorResponse)(res, error);
    });
});
exports.teacherById = teacherById;
const deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const deleteTeacherValidatorObj = new teacher_2.deleteTeacherValidator();
    deleteTeacherValidatorObj.userId = userId;
    (0, class_validator_1.validate)(teacher_2.deleteTeacherValidator).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, teacher_1.deleteTeacherServices)({
                userId: userId
            }).then((data) => {
                if (data.deletedCount == 0) {
                    (0, response_object_1.noContentResponse)(res, data, 'no Teacher deleted');
                }
                else {
                    (0, response_object_1.successResponse)(res, data, 'Teacher deleted successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.deleteTeacher = deleteTeacher;
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationId, TeacherSubject, batch, specialization, userId } = req.body;
    const updateTeacherValidatorFn = new teacher_2.updateTeacherValidator();
    // updateTeacherValidatorFn.TeacherId = TeacherId,
    updateTeacherValidatorFn.organizationId = organizationId;
    updateTeacherValidatorFn.TeacherSubject = TeacherSubject;
    updateTeacherValidatorFn.batch = batch;
    updateTeacherValidatorFn.specialization = specialization;
    updateTeacherValidatorFn.userId = userId;
    (0, class_validator_1.validate)(updateTeacherValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, teacher_1.findAndUpdateTeacherServices)({
                userId: userId
            }, {
                organizationId: organizationId,
                TeacherSubject: TeacherSubject,
                batch: batch,
                specialization: specialization,
            }).then((teacher) => {
                if (!teacher) {
                    (0, response_object_1.noContentResponse)(res, teacher, 'no user updated');
                }
                else {
                    (0, response_object_1.successResponse)(res, teacher, 'User updated successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.updateTeacher = updateTeacher;
