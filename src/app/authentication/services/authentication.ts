import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions, Query } from "mongoose";
import User, { UserDocument } from "../../user/models/user";
import Otp, { OtpDocument } from "../models/authentication";

export const generateResetPasswordService = (input: DocumentDefinition<OtpDocument>) => {
    return Otp.create(input);
}
export const checkResetPasswordService = (query: FilterQuery<OtpDocument>, options: QueryOptions = { learn: true }) => {
    return Otp.find(query, {}, options); 
}
export const findOtpServices = (query: FilterQuery<OtpDocument>, options: QueryOptions = { learn: true }) => {
    return Otp.find(query, {}, options); 
}
export const findAndUpdatePasswordServices = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {learn: true}) => {
    return User.findOneAndUpdate(query, update, options)
}