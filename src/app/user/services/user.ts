import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions, Query } from "mongoose";
import User, { UserDocument } from "../models/user";

export const createUserServices = (input: DocumentDefinition<UserDocument>) => {
    return User.create(input);
}

export const findUserServices = (query: FilterQuery<UserDocument>, options: QueryOptions = { learn: true }) => {
    return User.find(query, {}, options); 
}

export const findAndUpdateUserServices = (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {learn: true}) => {
    return User.findOneAndUpdate(query, update, options)
}

export const deleteUserServices = (query: FilterQuery<UserDocument>) => {
    return User.deleteOne(query)
}