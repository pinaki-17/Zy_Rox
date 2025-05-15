import type { Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // For generating JWTs
import nodemailer from 'nodemailer'; // For sending emails
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  const { uniqueId, password } = req.body;
  try {
      const user = await User.findOne({ uniqueId });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' }); // Use non-null assertion or check for undefined
      res.json({ token, user: { id: user._id, uniqueId: user.uniqueId, role: user.role } });


  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}
// @access  Public

export const loginAdmin = async (req: Request, res: Response) => {
  const { uniqueId, password } = req.body;
  try {
    // TODO: Implement actual admin login logic here
    // Find admin by uniqueId, compare password, generate JWT, etc.
    console.log(`Admin login attempt: ${uniqueId}`);
    res.json({ message: "Admin login endpoint hit. Implement actual logic.", user: { uniqueId, role: 'admin' }, token: "sample_admin_token" });
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    // Validate email and OTP presence
    if (!email || !otp) {
      return res.status(400).json({ message: 'Please provide email and OTP' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve the stored OTP and its expiry time from the user document
    const storedOtp = user.otp;
    const otpExpiresAt = user.otpExpiresAt;

    // Compare the entered OTP with the stored OTP and check for expiry
    if (storedOtp === otp && otpExpiresAt && otpExpiresAt > new Date()) {
      // Update the user document to set isEmailVerified to true
      user.isEmailVerified = true;
      await user.save();
      res.json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP', isExpired: otpExpiresAt && otpExpiresAt <= new Date() });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password, confirmPassword, accountType } = req.body;
  try {
    if (!name || !email || !phoneNumber || !password || !confirmPassword || !accountType) {
 return res.status(400).json({ message: 'Please enter all fields, including account type' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique ID (simple timestamp + random for now)
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // Create and save user
    const newUser = new User({ name, email, phoneNumber, passwordHash: hashedPassword, uniqueId, role: accountType });
    await newUser.save();

    console.log(`User registered: ${email}, Unique ID: ${uniqueId}`);
    res.status(201).json({ message: "User registered successfully", uniqueId: uniqueId });

  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Send OTP to user email
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    // Validate email presence
    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Store the OTP and set expiry time (e.g., 10 minutes from now)
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes in milliseconds
    await user.save();

    // Create a transporter object using your email provider's SMTP details
    const transporter = nodemailer.createTransport({
      host: 'YOUR_SMTP_HOST', // e.g., smtp.gmail.com
      port: 587, // e.g., 587 for TLS, 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'YOUR_EMAIL_ADDRESS', // Your email address
        pass: 'YOUR_EMAIL_PASSWORD', // Your email password
      },
    });

    // Email options
    const mailOptions = {
      from: 'YOUR_EMAIL_ADDRESS', // Sender address
      to: email, // List of recipients
      subject: 'Your OTP for Verification', // Subject line
      text: `Your OTP is: ${otp}`, // Plain text body
    };

    res.json({ message: 'OTP sent to email' });

  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
