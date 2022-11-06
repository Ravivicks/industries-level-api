"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organization_1 = require("../controllers/organization");
const router = express_1.default.Router();
router.post('/create-organization', organization_1.createOrganization);
router.delete('/delete-organization', organization_1.deleteOrganization);
router.put('/update-organization', organization_1.updateOrganization);
router.get('/organizations', organization_1.organizations);
// router.get('/organization/:id', organizationById);
exports.default = router;
