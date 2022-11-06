"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
}, { versionKey: false });
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
