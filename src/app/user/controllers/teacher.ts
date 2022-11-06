import { validate } from "class-validator";
import { errorResponse, noContentResponse, successResponse, successResponseArr } from "../../../utils/response-object";
import { Request, Response } from "express";
import { deleteTeacherServices, findAndUpdateTeacherServices, findTeacherServices } from "../services/teacher";
import { deleteTeacherValidator, updateTeacherValidator } from "../validators/teacher";

const teachers = async( req: Request, res: Response ) => {
   const totalDataCount = await findTeacherServices({}).count();
   await findTeacherServices({}).then(async (data) => {
    if (data.length == 0) {
        noContentResponse(res, data, 'no Teacher found');
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

const teacherById = async(req: Request, res: Response) => {
    await findTeacherServices({userId: req.params.userId}).then(async (data) => {
     if (data.length == 0) {
         noContentResponse(res, data, 'no Teacher found');
     } else {
         successResponse(res, data, 'Teacher fetch successfully')
     }
    }).catch((error) => {
     errorResponse(res, error)
    }) 
     
 };


const deleteTeacher = async(req: Request, res: Response) => {
    const { userId} = req.body;
    const deleteTeacherValidatorObj = new deleteTeacherValidator();
    deleteTeacherValidatorObj.userId = userId;
    validate(deleteTeacherValidator).then(async (errors: any) => {
        if (errors.length > 0 ){
            errorResponse(res, errors);
        } else {
            await deleteTeacherServices({
                userId: userId
            }).then((data) => {
                if(data.deletedCount == 0) {
                    noContentResponse(res, data, 'no Teacher deleted');
                } else {
                    successResponse(res, data, 'Teacher deleted successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })   
};

const updateTeacher = async( req: Request, res: Response ) => {
    const {organizationId, TeacherSubject, batch, specialization, userId} = req.body;
    const updateTeacherValidatorFn = new updateTeacherValidator();
    // updateTeacherValidatorFn.TeacherId = TeacherId,
    updateTeacherValidatorFn.organizationId = organizationId;
    updateTeacherValidatorFn.TeacherSubject = TeacherSubject;
    updateTeacherValidatorFn.batch = batch;
    updateTeacherValidatorFn.specialization = specialization;
    updateTeacherValidatorFn.userId = userId;
    validate(updateTeacherValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
        } else {
            await findAndUpdateTeacherServices({
                userId: userId},
                {
                    organizationId: organizationId,
                    TeacherSubject: TeacherSubject,
                    batch: batch,
                    specialization: specialization,
            }).then((teacher) => {
                if(!teacher) {
                    noContentResponse(res, teacher, 'no user updated');
                } else {
                    successResponse(res, teacher, 'User updated successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
            
        }
    })
};

export { teachers, updateTeacher, deleteTeacher, teacherById };