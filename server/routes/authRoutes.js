import express from "express"
import { resendOtp, signinController, signupController, verifyOtpController, profile } from "../controllers/authController.js";
import { authMiddleware } from "../middlwares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post('/signin', signinController);
authRouter.post('/signup', signupController);
authRouter.post('/verify-otp', verifyOtpController)
authRouter.post('/resend-otp', resendOtp);
authRouter.get('/me', authMiddleware, profile);

export default authRouter;
