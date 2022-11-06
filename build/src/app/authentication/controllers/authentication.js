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
exports.resetPassword = exports.verifyOtp = exports.forgotPassword = exports.loginUser = void 0;
const class_validator_1 = require("class-validator");
const response_object_1 = require("../../../utils/response-object");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const authentication_1 = require("../validators/authentication");
const user_1 = require("../../user/services/user");
const authentication_2 = require("../services/authentication");
dotenv_1.default.config();
const signature = process.env.JWTSIGN;
const primaryEmail = process.env.PRIMARYEMAIL;
const primaryPwd = process.env.PASSWORD;
const host = process.env.HOST;
const mailPort = process.env.MAILPORT;
const transporter = nodemailer_1.default.createTransport({
    host: host,
    port: mailPort,
    secure: false,
    requireTLS: true,
    auth: {
        user: primaryEmail,
        pass: primaryPwd
    }
});
const genrateOTP = () => {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
const sendAndSaveOtp = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    yield (0, authentication_2.generateResetPasswordService)({
        email: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.email,
        otp: genrateOTP(),
        otpGenerationTime: new Date().toISOString(),
        userId: (_b = user[0]) === null || _b === void 0 ? void 0 : _b._id
    }).then((user) => {
        if (!user) {
            (0, response_object_1.noContentResponse)(res, user, 'No user created');
        }
        else {
            transporter.sendMail({
                from: primaryEmail,
                to: user.email,
                subject: 'OTP Verification for Reset Password of Wise Learn Login ',
                text: `Hi ${user.email} Your Requested OTP is - ${user.otp}`
            }, (error, info) => {
                if (error) {
                    (0, response_object_1.errorResponse)(res, error, "Something Went Wrong Please Try after some Time");
                }
                else {
                    (0, response_object_1.successResponse)(res, user, 'email has been sent succesfully');
                }
            });
        }
    });
});
const loginUser = (req, res) => {
    const { email, password } = req.body;
    const loginUserValidatorFn = new authentication_1.loginUserValidator();
    loginUserValidatorFn.email = email;
    loginUserValidatorFn.password = password;
    (0, class_validator_1.validate)(loginUserValidatorFn).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, user_1.findUserServices)({ email: email }).then((user) => {
                if (user.length == 0) {
                    (0, response_object_1.noContentResponse)(res, user, `no user found with this ${email}`);
                }
                else {
                    const userData = user[0];
                    bcrypt_1.default.compare(password, userData === null || userData === void 0 ? void 0 : userData.password, function (err, result) {
                        if (result) {
                            const token = jsonwebtoken_1.default.sign({ userId: userData === null || userData === void 0 ? void 0 : userData._id }, signature);
                            if (token) {
                                (0, response_object_1.successResponse)(res, { token: token }, 'user logged in successfully');
                            }
                            else {
                                (0, response_object_1.errorResponse)(res, {}, 'some problem in token generation');
                            }
                        }
                        else {
                            (0, response_object_1.errorResponse)(res, {}, 'invalid credentials');
                        }
                    });
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
};
exports.loginUser = loginUser;
const forgotPassword = (req, res) => {
    const { email } = req.body;
    const forgotPasswordValidatorObj = new authentication_1.forgotPasswordValidator();
    forgotPasswordValidatorObj.email = email;
    (0, class_validator_1.validate)(forgotPasswordValidatorObj).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, user_1.findUserServices)({
                email: email
            }).then((user) => {
                if (user.length == 0) {
                    (0, response_object_1.noContentResponse)(res, user, `No user found with email of ${email}`);
                }
                else {
                    ((user) => __awaiter(void 0, void 0, void 0, function* () {
                        var _a;
                        yield (0, authentication_2.checkResetPasswordService)({ email: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.email }).then((data) => {
                            var _a;
                            if (data && data.length > 0) {
                                const currentDate = new Date();
                                const savedDate = new Date((_a = data[data.length - 1]) === null || _a === void 0 ? void 0 : _a.otpGenerationTime);
                                const second = ((currentDate.getTime() - savedDate.getTime()) / 1000);
                                if (second > 180) {
                                    sendAndSaveOtp(res, user);
                                }
                                else {
                                    (0, response_object_1.successResponse)(res, {}, `OTP already sent, Check your mail inbox and spam folder or else try to resend otp after ${Math.floor(second)} Sec to resend OTP`);
                                }
                            }
                            else {
                                sendAndSaveOtp(res, user);
                            }
                        }).catch((error) => {
                            (0, response_object_1.errorResponse)(res, error);
                        });
                    }))(user);
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
};
exports.forgotPassword = forgotPassword;
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;
    const verifyOtpValidatorFn = new authentication_1.verifyOtpValidator();
    verifyOtpValidatorFn.email = email;
    verifyOtpValidatorFn.otp = otp;
    (0, class_validator_1.validate)(verifyOtpValidatorFn).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, authentication_2.findOtpServices)({ email: email, otp: otp }).then((user) => {
                var _a;
                if (user.length == 0) {
                    (0, response_object_1.noContentResponse)(res, user, `invalid otp`);
                }
                else {
                    if (user.length > 0) {
                        const currentDate = new Date();
                        const savedDate = new Date((_a = user[user.length - 1]) === null || _a === void 0 ? void 0 : _a.otpGenerationTime);
                        const second = ((currentDate.getTime() - savedDate.getTime()) / 1000);
                        if (second < 90) {
                            (0, response_object_1.successResponse)(res, user, "otp verified");
                        }
                        else {
                            (0, response_object_1.errorResponse)(res, user, 'otp expired');
                        }
                    }
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
};
exports.verifyOtp = verifyOtp;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, confirmPassword } = req.body;
    const resetPasswordValidatorObj = new authentication_1.resetPasswordValidator();
    resetPasswordValidatorObj.newPassword = newPassword;
    resetPasswordValidatorObj.confirmPassword = confirmPassword;
    resetPasswordValidatorObj.email = email;
    (0, class_validator_1.validate)(resetPasswordValidatorObj).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            if (newPassword === confirmPassword) {
                bcrypt_1.default.hash(confirmPassword, 10, (error, hasPassword) => __awaiter(void 0, void 0, void 0, function* () {
                    if (error) {
                        (0, response_object_1.errorResponse)(res, error);
                    }
                    else {
                        yield (0, authentication_2.findAndUpdatePasswordServices)({
                            email: email
                        }, {
                            password: hasPassword,
                        }).then((user) => {
                            if (!user) {
                                (0, response_object_1.noContentResponse)(res, user, 'no user updated');
                            }
                            else {
                                (0, response_object_1.successResponse)(res, user, 'Password updated successfully');
                            }
                        }).catch((error) => {
                            (0, response_object_1.errorResponse)(res, error);
                        });
                    }
                }));
            }
            else {
                (0, response_object_1.errorResponse)(res, error, 'Password Mismatch');
            }
        }
    }));
});
exports.resetPassword = resetPassword;
