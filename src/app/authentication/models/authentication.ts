import { Schema, model, Document } from "mongoose";

export interface OtpDocument extends Document {
    email: String,
    otp: String,
    otpGenerationTime: any,
    userId: String,
}

interface Otp {
    email: String,
    otp: String,
    otpGenerationTime: any,
    userId: String,
}

const otpSchema = new Schema<Otp>({
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
}, { versionKey: false })

const OtpModel = model<Otp>('Otp', otpSchema)

export default OtpModel;
