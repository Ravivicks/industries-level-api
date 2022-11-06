"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        // required: true
    },
    otp: {
        type: String,
        // required: true
    },
    otpGenerationTime: {
        type: String,
        // required: true
    },
    userId: {
        type: String,
        // required: true
    },
}, { versionKey: false });
const OtpModel = (0, mongoose_1.model)('Otp', otpSchema);
exports.default = OtpModel;
