import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
   firstName: String,
   lastName: String,
    email: String,
    phone: String,
    password: String,
    userStatus: String,
    userType: String,
    address: String,
    nationality: String,
    dob: String,
    gender: String
}

interface User {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    userStatus: String,
    userType: String,
    address: String,
    nationality: String,
    dob: String,
    gender: String
}

const userSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    dob: {
        type: String
    },
    nationality: {
        type: String
    },
    gender: {
        type: String,
    },
}, { versionKey: false })

const UserModel = model<User>('User', userSchema)

export default UserModel;