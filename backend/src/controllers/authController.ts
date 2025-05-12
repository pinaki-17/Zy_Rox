import type { Request, Response } from 'express';
import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken'; // For generating JWTs

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Basic placeholder logic
    if (email && password) {
      // In a real app:
      // 1. Find user by email: const user = await User.findOne({ email });
      // 2. If user and password matches (bcrypt.compare): const isMatch = await user.comparePassword(password);
      // 3. If matches, generate JWT token: const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      // 4. Send token: res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
      console.log(`User login attempt: ${email}`);
      res.json({ message: "User login endpoint hit. Implement actual logic.", user: { email, role: 'user' }, token: "sample_user_token" });
    } else {
      res.status(400).json({ message: "Please provide email and password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/admin/login
// @access  Public
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Basic placeholder logic
     if (email && password) {
      // In a real app, similar to user login but check for role 'admin'
      console.log(`Admin login attempt: ${email}`);
      res.json({ message: "Admin login endpoint hit. Implement actual logic.", user: { email, role: 'admin' }, token: "sample_admin_token" });
    } else {
      res.status(400).json({ message: "Please provide email and password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Register user (Example)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role = 'user' } = req.body;
  try {
    // let user = await User.findOne({ email });
    // if (user) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }
    // const salt = await bcrypt.genSalt(10);
    // const passwordHash = await bcrypt.hash(password, salt);

    // user = new User({ email, passwordHash, role });
    // await user.save();
    
    // const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    
    console.log(`User registration attempt: ${email}`);
    res.status(201).json({ message: "User registration endpoint hit. Implement actual logic." });

  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
