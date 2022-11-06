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
exports.organizations = exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = void 0;
const class_validator_1 = require("class-validator");
const response_object_1 = require("../../../utils/response-object");
const organization_1 = require("../services/organization");
const organization_2 = require("../validators/organization");
const organizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalDataCount = yield (0, organization_1.findOrganizationServices)({}).count();
    yield (0, organization_1.findOrganizationServices)({}).then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.length == 0) {
            (0, response_object_1.noContentResponse)(res, data, 'no Organization found');
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
exports.organizations = organizations;
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationName, establishmentYear, organizationAddress } = req.body;
    const createOrganizationValidatorFn = new organization_2.createOrganizationValidator();
    createOrganizationValidatorFn.organizationName = organizationName;
    (0, class_validator_1.validate)(createOrganizationValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, organization_1.createOrganizationServices)({
                organizationName: organizationName,
                establishmentYear: establishmentYear,
                organizationAddress: organizationAddress,
            }).then((organization) => {
                if (!organization) {
                    (0, response_object_1.noContentResponse)(res, organization, 'no Organization created');
                }
                else {
                    (0, response_object_1.successResponse)(res, organization, 'Organization created successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.createOrganization = createOrganization;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationId } = req.body;
    const deleteOrganizationValidatorObj = new organization_2.deleteOrganizationValidator();
    deleteOrganizationValidatorObj.organizationId = organizationId;
    (0, class_validator_1.validate)(organization_2.deleteOrganizationValidator).then((errors) => __awaiter(void 0, void 0, void 0, function* () {
        if (errors.length > 0) {
            (0, response_object_1.errorResponse)(res, errors);
        }
        else {
            yield (0, organization_1.deleteOrganizationServices)({
                _id: organizationId
            }).then((data) => {
                if (data.deletedCount == 0) {
                    (0, response_object_1.noContentResponse)(res, data, 'no Organization deleted');
                }
                else {
                    (0, response_object_1.successResponse)(res, data, 'Organization deleted successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.deleteOrganization = deleteOrganization;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizationName, establishmentYear, organizationAddress, organizationId } = req.body;
    const udateOrganizationValidatorFn = new organization_2.updateOrganizationValidator();
    udateOrganizationValidatorFn.organizationId = organizationId;
    udateOrganizationValidatorFn.organizationName = organizationName;
    (0, class_validator_1.validate)(udateOrganizationValidatorFn).then((error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error.length > 0) {
            (0, response_object_1.errorResponse)(res, error);
        }
        else {
            yield (0, organization_1.findAndUpdateOrganizationServices)({
                _id: organizationId
            }, {
                organizationName: organizationName,
                establishmentYear: establishmentYear,
                organizationAddress: organizationAddress,
            }).then((organization) => {
                if (!organization) {
                    (0, response_object_1.noContentResponse)(res, organization, 'no Organization updated');
                }
                else {
                    (0, response_object_1.successResponse)(res, organization, 'Organization updated successfully');
                }
            }).catch((error) => {
                (0, response_object_1.errorResponse)(res, error);
            });
        }
    }));
});
exports.updateOrganization = updateOrganization;
