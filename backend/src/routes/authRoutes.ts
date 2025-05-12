import express from 'express';
import { loginUser, loginAdmin, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);
router.post('/register', registerUser); // Example registration route

export default router;
