import { Schema, model, Document } from "mongoose";

export interface TeacherDocument extends Document {
    organizationId: string,
    TeacherSubject: string,
    batch: string,
    specialization: string,
    userId: any
}

interface Teacher {
    organizationId: string,
    TeacherSubject: string,
    batch: string,
    specialization: string,
    userId: any

}

const teacherSchema = new Schema<Teacher>({
    organizationId: {
        type: String
    },
    TeacherSubject: {
        type: String
    },
    batch: {
        type: String
    },
    specialization: {
        type: String
    },
    userId: {
        type: String
    },
}, { versionKey: false })

const TeacherModel = model<Teacher>('Teacher', teacherSchema)

export default TeacherModel;