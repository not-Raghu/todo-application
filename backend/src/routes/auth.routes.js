import express from 'express'
import { signup,login,logout } from '../controllers/auth.controller.js';
import { signupMiddleware,verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.post('/signup' , signupMiddleware, signup);
router.post('/login' , login);
router.get('/logout' ,verifyToken, logout);

export default router;

