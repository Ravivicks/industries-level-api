import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions, Query } from "mongoose";
import Teacher, { TeacherDocument } from "../models/teacher";

export const createTeacherServices = (input: DocumentDefinition<TeacherDocument>) => {
    return Teacher.create(input);
}

export const findTeacherServices = (query: FilterQuery<TeacherDocument>, options: QueryOptions = { learn: true }) => {
    return Teacher.find(query, {}, options); 
}

export const findAndUpdateTeacherServices = (query: FilterQuery<TeacherDocument>, update: UpdateQuery<TeacherDocument>, options: QueryOptions = {learn: true}) => {
    return Teacher.findOneAndUpdate(query, update, options)
}

export const deleteTeacherServices = (query: FilterQuery<TeacherDocument>) => {
    return Teacher.deleteOne(query)
}