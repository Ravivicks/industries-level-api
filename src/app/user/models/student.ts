import { Schema, model, Document } from "mongoose";

export interface StudentDocument extends Document {
    rollNumber: string,
    studentClass: string,
    collageName: string,
    courseName: string,
    userId: any
}

interface Student {
    rollNumber: string,
    studentClass: string,
    collageName: string,
    courseName: string,
    userId: any

}

const studentSchema = new Schema<Student>({
    rollNumber: {
        type: String
    },
    studentClass: {
        type: String
    },
    collageName: {
        type: String
    },
    courseName: {
        type: String
    },
    userId: {
        type: String
    },
}, { versionKey: false })

const StudentModel = model<Student>('Student', studentSchema)

export default StudentModel;