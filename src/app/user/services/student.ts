import { DocumentDefinition, FilterQuery, UpdateQuery,QueryOptions, Query } from "mongoose";
import Student, { StudentDocument } from "../models/student";

export const createStudentServices = (input: DocumentDefinition<StudentDocument>) => {
    return Student.create(input);
}

export const findStudentServices = (query: FilterQuery<StudentDocument>, options: QueryOptions = { learn: true }) => {
    return Student.find(query, {}, options); 
}

export const findAndUpdateStudentServices = (query: FilterQuery<StudentDocument>, update: UpdateQuery<StudentDocument>, options: QueryOptions = {learn: true}) => {
    return Student.findOneAndUpdate(query, update, options)
}

export const deleteStudentServices = (query: FilterQuery<StudentDocument>) => {
    return Student.deleteOne(query)
}