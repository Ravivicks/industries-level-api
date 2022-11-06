import { Schema, model, Document } from "mongoose";

export interface OrganizationDocument extends Document {
    organizationName: String,
    establishmentYear: String,
    organizationAddress: String,
}

interface Organization {
    organizationName: String,
    establishmentYear: String,
    organizationAddress: String,
}

const organizationSchema = new Schema<Organization>({
    organizationName: {
        type: String,
        required: true
    },
    establishmentYear: {
        type: String,
    },
    organizationAddress: {
        type: String,
    },
}, { versionKey: false })

const OrganizationModel = model<Organization>('Organization', organizationSchema)

export default OrganizationModel;