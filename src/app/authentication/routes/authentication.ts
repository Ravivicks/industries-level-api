import express from 'express';
import { forgotPassword, loginUser, verifyOtp, resetPassword } from '../controllers/authentication';


const router = express.Router();

router.post('/login-user', loginUser);
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp)
router.post('/reset-password', resetPassword)




export default router;