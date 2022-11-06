"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizationServices = exports.findAndUpdateOrganizationServices = exports.findOrganizationServices = exports.createOrganizationServices = void 0;
const organization_1 = __importDefault(require("../models/organization"));
const createOrganizationServices = (input) => {
    return organization_1.default.create(input);
};
exports.createOrganizationServices = createOrganizationServices;
const findOrganizationServices = (query, options = { learn: true }) => {
    return organization_1.default.find(query, {}, options);
};
exports.findOrganizationServices = findOrganizationServices;
const findAndUpdateOrganizationServices = (query, update, options = { learn: true }) => {
    return organization_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateOrganizationServices = findAndUpdateOrganizationServices;
const deleteOrganizationServices = (query) => {
    return organization_1.default.deleteOne(query);
};
exports.deleteOrganizationServices = deleteOrganizationServices;
