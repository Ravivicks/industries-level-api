import { validate } from "class-validator";
import { errorResponse, noContentResponse, successResponse, successResponseArr } from "../../../utils/response-object";
import { Request, Response } from "express";
import { deleteStudentValidator, updateStudentValidator } from "../validators/student";
import { deleteStudentServices, findAndUpdateStudentServices, findStudentServices } from "../services/student";

const students = async( req: Request, res: Response ) => {
   const totalDataCount = await findStudentServices({}).count();
   await findStudentServices({}).then(async (data) => {
    if (data.length == 0) {
        noContentResponse(res, data, 'no student found');
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

const studentById = async(req: Request, res: Response) => {
   await findStudentServices({userId: req.params.userId}).then(async (data) => {
    if (data.length == 0) {
        noContentResponse(res, data, 'no student found');
    } else {
        successResponse(res, data, 'Student fetch successfully')
    }
   }).catch((error) => {
    errorResponse(res, error)
   }) 
    
};


const deleteStudent = async(req: Request, res: Response) => {
    const { userId} = req.body;
    const deleteStudentValidatorObj = new deleteStudentValidator();
    deleteStudentValidatorObj.userId = userId;
    validate(deleteStudentValidator).then(async (errors: any) => {
        if (errors.length > 0 ){
            errorResponse(res, errors);
        } else {
            await deleteStudentServices({
                userId: userId
            }).then((data) => {
                if(data.deletedCount == 0) {
                    noContentResponse(res, data, 'no student deleted');
                } else {
                    successResponse(res, data, 'Student deleted successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })   
};

const updateStudent = async( req: Request, res: Response ) => {
    const {rollNumber, studentClass, collageName, courseName, userId} = req.body;
    const updateStudentValidatorFn = new updateStudentValidator();
    // updateStudentValidatorFn.studentId = studentId,
    updateStudentValidatorFn.rollNumber = rollNumber;
    updateStudentValidatorFn.studentClass = studentClass;
    updateStudentValidatorFn.collageName = collageName;
    updateStudentValidatorFn.courseName = courseName;
    updateStudentValidatorFn.userId = userId;
    validate(updateStudentValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
        } else {
            await findAndUpdateStudentServices({
                userId: userId},
                {
                    rollNumber: rollNumber,
                    studentClass: studentClass,
                    collageName: collageName,
                    courseName: courseName,
            }).then((student) => {
                if(!student) {
                    noContentResponse(res, student, 'no user updated');
                } else {
                    successResponse(res, student, 'User updated successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
            
        }
    })
};

export { students, updateStudent, deleteStudent, studentById };