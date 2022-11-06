import express from 'express';

import { deleteStudent, updateStudent, students, studentById } from '../controllers/student';

const router = express.Router();

// router.post('/create-student', createStudent);
router.delete('/delete-student', deleteStudent);
router.put('/update-student', updateStudent);
router.get('/students', students);
router.get('/students/:userId', studentById);

export default router;