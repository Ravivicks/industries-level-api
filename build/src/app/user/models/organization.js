"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
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
}, { versionKey: false });
const OrganizationModel = (0, mongoose_1.model)('Organization', organizationSchema);
exports.default = OrganizationModel;
