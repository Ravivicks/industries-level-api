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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.userById = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const class_validator_1 = require("class-validator");
const response_object_1 = require("../../../utils/response-object");
const user_1 = require("../validators/user");
const user_2 = require("../services/user");
const student_1 = require("../services/student");
const teacher_1 = require("../services/teacher");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalDataCount = yield (0, user_2.findUserServices)({}).count();
    yield (0, user_2.findUserServices)({}).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no user found');
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
exports.users = users;
const userById = () => {
    console.log('user by id');
};
exports.userById = userById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, password, userStatus, userType, address, nationality, gender, dob } = req.body;
    const createUserValidatorFn = new user_1.createUserValidator();
    createUserValidatorFn.firstName = firstName;
    createUserValidatorFn.lastName = lastName;
    createUserValidatorFn.email = email;
    createUserValidatorFn.phone = phone;
    createUserValidatorFn.password = password;
    createUserValidatorFn.userStatus = userStatus;
    createUserValidatorFn.userType = userType;
    (0, class_validator_1.validate)(createUserValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, user_2.findUserServices)({ email: email }).then((user) => {
                if (user.length == 0) {
                    bcrypt_1.default.hash(password, 10, (error, hasPassword) => __awaiter(void 0, void 0, void 0, function* () {
                        if (error) {
                            (0, response_object_1.errorResponse)(res, error);
                        }
                        else {
                            yield (0, user_2.createUserServices)({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                phone: phone,
                                password: hasPassword,
                                userStatus: userStatus,
                                userType: userType,
                                address: address,
                                dob: dob,
                                nationality: nationality,
                                gender: gender
                            }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
                                var _a, _b;
                                if (userType == 'student') {
                                    yield (0, student_1.createStudentServices)({
                                        userId: ((_a = user._id) === null || _a === void 0 ? void 0 : _a.toString()) || '',
                                        rollNumber: "",
                                        studentClass: "",
                                        collageName: "",
                                        courseName: ""
                                    }).then((user) => {
                                        if (!user) {
                                            (0, response_object_1.noContentResponse)(res, user, 'no student created');
                                        }
                                        else {
                                            (0, response_object_1.successResponse)(res, user, 'Student created successfully');
                                        }
                                    });
                                }
                                else if (userType == 'teacher') {
                                    yield (0, teacher_1.createTeacherServices)({
                                        userId: ((_b = user._id) === null || _b === void 0 ? void 0 : _b.toString()) || '',
                                        organizationId: "",
                                        TeacherSubject: "",
                                        batch: "",
                                        specialization: ""
                                    }).then((user) => {
                                        if (!user) {
                                            (0, response_object_1.noContentResponse)(res, user, 'no Teacher created');
                                        }
                                        else {
                                            (0, response_object_1.successResponse)(res, user, 'Teacher created successfully');
                                        }
                                    });
                                }
                            })).catch((error) => {
                                (0, response_object_1.errorResponse)(res, error);
                            });
                        }
                    }));
                }
                else {
                    (0, response_object_1.errorResponse)(res, 'Email already Registred please try another one');
                }
            });
        }
    }));
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const deleteUserValidatorObj = new user_1.deleteUserValidator();
    deleteUserValidatorObj.userId = userId;
    (0, class_validator_1.validate)(user_1.deleteUserValidator).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, user_2.deleteUserServices)({
                _id: userId
            }).then((data) => {
                if (data.deletedCount == 0) {
                    (0, response_object_1.noContentResponse)(res, data, 'no user deleted');
                }
                else {
                    (0, response_object_1.successResponse)(res, data, 'User deleted successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, password, userStatus, userId, userType } = req.body;
    const updateUserValidatorFn = new user_1.updateUserValidator();
    updateUserValidatorFn.userId = userId;
    updateUserValidatorFn.firstName = firstName;
    updateUserValidatorFn.lastName = lastName;
    updateUserValidatorFn.email = email;
    updateUserValidatorFn.phone = phone;
    updateUserValidatorFn.password = password;
    updateUserValidatorFn.userStatus = userStatus;
    updateUserValidatorFn.userType = userType;
    (0, class_validator_1.validate)(updateUserValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, user_2.findAndUpdateUserServices)({
                _id: userId
            }, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
                userStatus: userStatus,
                userType: userType
            }).then((user) => {
                if (!user) {
                    (0, response_object_1.noContentResponse)(res, user, 'no user updated');
                }
                else {
                    (0, response_object_1.successResponse)(res, user, 'User updated successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.updateUser = updateUser;
