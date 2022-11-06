import { validate } from "class-validator";
import { errorResponse, noContentResponse, successResponse } from "../../../utils/response-object";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { forgotPasswordValidator, loginUserValidator, resetPasswordValidator, verifyOtpValidator } from "../validators/authentication";
import { findUserServices } from "../../user/services/user";
import { checkResetPasswordService, findAndUpdatePasswordServices, findOtpServices, generateResetPasswordService } from "../services/authentication";


dotenv.config();

const signature: any = process.env.JWTSIGN;
const primaryEmail: any = process.env.PRIMARYEMAIL;
const primaryPwd: any = process.env.PASSWORD;
const host: any = process.env.HOST;
const mailPort: any = process.env.MAILPORT;

const transporter: any = nodemailer.createTransport({
    host: host,
    port: mailPort,
    secure: false,
    requireTLS: true,
    auth: {
        user: primaryEmail,
        pass: primaryPwd
    }
});


const genrateOTP: any = () => {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const sendAndSaveOtp: any = async (res: any, user: any) => {
    await generateResetPasswordService({
        email: user[0]?.email,
        otp: genrateOTP(),
        otpGenerationTime: new Date().toISOString(),
        userId: user[0]?._id
    }).then((user) => {
        if (!user) {
            noContentResponse(res, user, 'No user created')
        } else {
            transporter.sendMail(
                {
                    from: primaryEmail,
                    to: user.email,
                    subject: 'OTP Verification for Reset Password of Wise Learn Login ',
                    text: `Hi ${user.email} Your Requested OTP is - ${user.otp}`
                },
                (error: any, info: any) => {
                    if (error) {
                        errorResponse(res, error, "Something Went Wrong Please Try after some Time")
                    } else {
                        successResponse(res, user, 'email has been sent succesfully')
                    }
                })
        }
    })
}

const loginUser: any = (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginUserValidatorFn = new loginUserValidator();
    loginUserValidatorFn.email = email;
    loginUserValidatorFn.password = password;
    validate(loginUserValidatorFn).then(async (errors: any) => {
        if (errors.length > 0) {
            errorResponse(res, errors)
        } else {
            await findUserServices({ email: email }).then((user) => {
                if (user.length == 0) {
                    noContentResponse(res, user, `no user found with this ${email}`);
                } else {
                    const userData: any = user[0];
                    bcrypt.compare(password, userData?.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({ userId: userData?._id }, signature);
                            if (token) {
                                successResponse(res, { token: token }, 'user logged in successfully')
                            } else {
                                errorResponse(res, {}, 'some problem in token generation')
                            }
                        } else {
                            errorResponse(res, {}, 'invalid credentials')
                        }
                    })
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })
}

const forgotPassword: any = (req: any, res: Response) => {
    const { email } = req.body;
    const forgotPasswordValidatorObj = new forgotPasswordValidator();
    forgotPasswordValidatorObj.email = email;
    validate(forgotPasswordValidatorObj).then(async (errors: any) => {
        if (errors.length > 0) {
            errorResponse(res, errors);
        } else {
            await findUserServices({
                email: email
            }).then((user) => {
                if (user.length == 0) {
                    noContentResponse(res, user, `No user found with email of ${email}`);
                } else {
                    (async (user: any) => {
                        await checkResetPasswordService({ email: user[0]?.email }).then((data) => {
                            if (data && data.length > 0) {
                                const currentDate: any = new Date();
                                const savedDate: any = new Date(data[data.length - 1]?.otpGenerationTime);
                                const second = ((currentDate.getTime() - savedDate.getTime()) / 1000);
                                if (second > 180) {
                                    sendAndSaveOtp(res, user)
                                } else {
                                    successResponse(res, {}, `OTP already sent, Check your mail inbox and spam folder or else try to resend otp after ${Math.floor(second)} Sec to resend OTP`);
                                }
                            } else {
                                sendAndSaveOtp(res, user)
                            }
                        }).catch((error) => {
                            errorResponse(res, error)
                        })
                    })(user)
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    });
}

const verifyOtp: any = (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const verifyOtpValidatorFn = new verifyOtpValidator();
    verifyOtpValidatorFn.email = email;
    verifyOtpValidatorFn.otp = otp;
    validate(verifyOtpValidatorFn).then(async (errors: any) => {
        if (errors.length > 0) {
            errorResponse(res, errors)
        } else {
            await findOtpServices({ email: email, otp: otp }).then((user) => {
                if (user.length == 0) {
                    noContentResponse(res, user, `invalid otp`);
                } else {
                    if (user.length > 0) {
                        const currentDate: any = new Date();
                        const savedDate: any = new Date(user[user.length - 1]?.otpGenerationTime);
                        const second: any = ((currentDate.getTime() - savedDate.getTime()) / 1000);
                        if (second < 90) {
                            successResponse(res, user, "otp verified")
                        } else {
                            errorResponse(res, user, 'otp expired')
                        }
                    }
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })
}

const resetPassword: any = async (req: Request, res: Response) => {
    const { email, newPassword, confirmPassword } = req.body;
    const resetPasswordValidatorObj = new resetPasswordValidator();
    resetPasswordValidatorObj.newPassword = newPassword;
    resetPasswordValidatorObj.confirmPassword = confirmPassword;
    resetPasswordValidatorObj.email = email;
    validate(resetPasswordValidatorObj).then(async (error) => {
        if (error.length > 0) {
            errorResponse(res, error)
        } else {
            if (newPassword === confirmPassword) {
                bcrypt.hash(confirmPassword, 10, async (error, hasPassword) => {
                    if (error) {
                        errorResponse(res, error)
                    } else {
                        await findAndUpdatePasswordServices({
                            email: email
                        },
                            {
                                password: hasPassword,
                            }).then((user) => {
                                if (!user) {
                                    noContentResponse(res, user, 'no user updated');
                                } else {
                                    successResponse(res, user, 'Password updated successfully')
                                }
                            }).catch((error) => {
                                errorResponse(res, error)
                            })
                    }
                })

            } else {
                errorResponse(res, error, 'Password Mismatch')
            }

        }
    })
};

export { loginUser, forgotPassword, verifyOtp, resetPassword };

