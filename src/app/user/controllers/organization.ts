import { validate } from "class-validator";
import { errorResponse, noContentResponse, successResponse, successResponseArr } from "../../../utils/response-object";
import { Request, Response } from "express";
import { createOrganizationServices, deleteOrganizationServices, findAndUpdateOrganizationServices, findOrganizationServices } from "../services/organization";
import { createOrganizationValidator, deleteOrganizationValidator, updateOrganizationValidator } from "../validators/organization";

const organizations = async( req: Request, res: Response ) => {
   const totalDataCount = await findOrganizationServices({}).count();
   await findOrganizationServices({}).then(async (data) => {
    if (data.length == 0) {
        noContentResponse(res, data, 'no Organization found');
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

const createOrganization = async( req: Request, res: Response ) => {
    const {organizationName, establishmentYear, organizationAddress } = req.body;
    const createOrganizationValidatorFn = new createOrganizationValidator();
    createOrganizationValidatorFn.organizationName = organizationName;
    validate(createOrganizationValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
        } else {
            await createOrganizationServices({
                organizationName: organizationName,
                establishmentYear: establishmentYear,
                organizationAddress: organizationAddress,
            }).then((organization) => {
                if(!organization) {
                    noContentResponse(res, organization, 'no Organization created');
                } else {
                    successResponse(res, organization, 'Organization created successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
            
        }
    })
};

const deleteOrganization = async(req: Request, res: Response) => {
    const { organizationId } = req.body;
    const deleteOrganizationValidatorObj = new deleteOrganizationValidator();
    deleteOrganizationValidatorObj.organizationId = organizationId;
    validate(deleteOrganizationValidator).then(async (errors: any) => {
        if (errors.length > 0 ){
            errorResponse(res, errors);
        } else {
            await deleteOrganizationServices({
                _id: organizationId
            }).then((data) => {
                if(data.deletedCount == 0) {
                    noContentResponse(res, data, 'no Organization deleted');
                } else {
                    successResponse(res, data, 'Organization deleted successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
        }
    })   
};

const updateOrganization = async( req: Request, res: Response ) => {
    const { organizationName, establishmentYear, organizationAddress, organizationId } = req.body;
    const udateOrganizationValidatorFn = new updateOrganizationValidator();
    udateOrganizationValidatorFn.organizationId = organizationId;
    udateOrganizationValidatorFn.organizationName = organizationName;
    validate(udateOrganizationValidatorFn).then(async(error) => {
        if(error.length > 0) {
            errorResponse(res,error)
            
            
        } else {
            await findAndUpdateOrganizationServices({
                _id: organizationId},
                {
                    organizationName: organizationName,
                    establishmentYear: establishmentYear,
                    organizationAddress: organizationAddress,
            }).then((organization) => {
                if(!organization) {
                    noContentResponse(res, organization, 'no Organization updated');
                } else {
                    successResponse(res, organization, 'Organization updated successfully')
                }
            }).catch((error) => {
                errorResponse(res, error)
            })
            
        }
    })
};

export { createOrganization, updateOrganization, deleteOrganization, organizations };