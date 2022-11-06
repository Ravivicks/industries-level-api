import express from 'express';

import { deleteTeacher, updateTeacher, teachers, teacherById } from '../controllers/teacher';

const router = express.Router();

router.delete('/delete-teacher', deleteTeacher);
router.put('/update-teacher', updateTeacher);
router.get('/teachers', teachers);
router.get('/teachersbyid/:userId', teacherById);

export default router;