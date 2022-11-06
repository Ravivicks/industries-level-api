import express from 'express';
import { authMiddleware } from '../../../utils/middleware';

import { createUser, deleteUser, updateUser, users, userById } from '../controllers/user';

const router = express.Router();

router.post('/create-user', createUser);
router.delete('/delete-user', deleteUser);
router.put('/update-user', updateUser);
router.get('/users', authMiddleware, users);
router.get('/user/:id', userById);

export default router;