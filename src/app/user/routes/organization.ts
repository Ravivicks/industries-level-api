import express from 'express';

import { createOrganization, deleteOrganization, updateOrganization, organizations } from '../controllers/organization';

const router = express.Router();

router.post('/create-organization', createOrganization);
router.delete('/delete-organization', deleteOrganization);
router.put('/update-organization', updateOrganization);
router.get('/organizations', organizations);
// router.get('/organization/:id', organizationById);

export default router;