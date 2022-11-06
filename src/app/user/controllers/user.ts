import { validate } from "class-validator";
import { errorResponse, noContentResponse, successResponse, successResponseArr } from "../../../utils/response-object";
import { createUserValidator, deleteUserValidator, updateUserValidator } from "../validators/user";
import { Request, Response } from "express";
import { createUserServices, deleteUserServices, findAndUpdateUserServices, findUserServices } from "../services/user";
import { createStudentServices } from "../services/student";
import { createTeacherServices } from "../services/teacher";
import bcrypt from 'bcrypt';

const users = async( req: Request, res: Response ) => {
   const totalDataCount = await findUserServices({}).count();
   await findUserServices({}).then(async (data) => {
    if (data.length == 0) {
        noContentResponse(res, data, 'no user found');
    } else {
        successResponseArr(res, data, {
            total: totalDataCount,
            current: data.length
        }, 'fetch Data successfully')
    }
   }).catch((error) => {
    errorResponse(res, error)
   })   
};

const userById = () => {
    console.log('user by id');
    
};

const createUser = async( req: Request, res: Response ) => {
    const {firstName, lastName, email, phone, password, userStatus, userType, address, nationality, gender, dob} = req.body;
    const createUserValidatorFn = new createUserValidator();
    createUserValidatorFn.firstName = firstName;
    createUserValidatorFn.lastName = lastName;
    createUserValidatorFn.email = email;
    createUserValidatorFn.phone = phone;
    createUserValidatorFn.password = password;
    createUserValidatorFn.userStatus = userStatus;
    createUserValidatorFn.userType = userType;
    validate(createUserValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
        } else {
            await findUserServices({ email: email }).then((user) => {
                if (user.length == 0) {
                    bcrypt.hash(password, 10, async (error, hasPassword) => {
                        if (error) {
                            errorResponse(res, error)
                        } else {
                            await createUserServices({
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
                            }).then(async (user: any) => {
                                if (userType == 'student') {
                                    await createStudentServices({
                                        userId: user._id?.toString() || '',
                                        rollNumber: "",
                                        studentClass: "",
                                        collageName: "",
                                        courseName: ""
                                    }).then((user) => {
                                        if(!user) {
                                            noContentResponse(res, user, 'no student created');
                                        } else {
                                            successResponse(res, user, 'Student created successfully')
                                        }
                                    })
                                } else if (userType == 'teacher') {
                                    await createTeacherServices({
                                        userId: user._id?.toString() || '',
                                        organizationId: "",
                                        TeacherSubject: "",
                                        batch: "",
                                        specialization: ""
                                    }).then((user) => {
                                        if(!user) {
                                            noContentResponse(res, user, 'no Teacher created');
                                        } else {
                                            successResponse(res, user, 'Teacher created successfully')
                                        }
                                    })
                                }
                            }).catch((error) => {
                                errorResponse(res, error)
                            })
                        }
                    })
                } else {
                    
                    errorResponse(res, 'Email already Registred please try another one')                    
                }
            })
            
            
        }
    })
};

const deleteUser = async(req: Request, res: Response) => {
    const { userId} = req.body;
    const deleteUserValidatorObj = new deleteUserValidator();
    deleteUserValidatorObj.userId = userId;
    validate(deleteUserValidator).then(async (errors: any) => {
        if (errors.length > 0 ){
            errorResponse(res, errors);
        } else {
            await deleteUserServices({
                _id: userId
            }).then((data) => {
                if(data.deletedCount == 0) {
                    noContentResponse(res, data, 'no user deleted');
                } else {
                    successResponse(res, data, 'User deleted successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })   
};

const updateUser = async( req: Request, res: Response ) => {
    const {firstName, lastName, email, phone, password, userStatus, userId, userType} = req.body;
    const updateUserValidatorFn = new updateUserValidator();
    updateUserValidatorFn.userId = userId;
    updateUserValidatorFn.firstName = firstName;
    updateUserValidatorFn.lastName = lastName;
    updateUserValidatorFn.email = email;
    updateUserValidatorFn.phone = phone;
    updateUserValidatorFn.password = password;
    updateUserValidatorFn.userStatus = userStatus;
    updateUserValidatorFn.userType = userType;
    validate(updateUserValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
        } else {
            await findAndUpdateUserServices({
                _id: userId},
                {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
                userStatus: userStatus,
                userType: userType
            }).then((user) => {
                if(!user) {
                    noContentResponse(res, user, 'no user updated');
                } else {
                    successResponse(res, user, 'User updated successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
            
        }
    })
};

export { createUser, updateUser, deleteUser, userById, users };