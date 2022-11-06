import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions, Query } from "mongoose";
import Organization, { OrganizationDocument } from "../models/organization";

export const createOrganizationServices = (input: DocumentDefinition<OrganizationDocument>) => {
    return Organization.create(input);
}

export const findOrganizationServices = (query: FilterQuery<OrganizationDocument>, options: QueryOptions = { learn: true }) => {
    return Organization.find(query, {}, options); 
}

export const findAndUpdateOrganizationServices = (query: FilterQuery<OrganizationDocument>, update: UpdateQuery<OrganizationDocument>, options: QueryOptions = {learn: true}) => {
    return Organization.findOneAndUpdate(query, update, options)
}

export const deleteOrganizationServices = (query: FilterQuery<OrganizationDocument>) => {
    return Organization.deleteOne(query)
}