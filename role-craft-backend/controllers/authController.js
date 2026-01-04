import Admin from "../models/Admin.js";
import { generateToken } from "../middleware/auth.js";
import crypto from "crypto"; // Built-in Node module
import sendEmail from "../utils/sendEmail.js";


// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// @desc    Create first admin (use only once)
// @route   POST /api/auth/create-admin
// @access  Public
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. SECURITY CHECK: Check if ANY admin already exists
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      return res.status(403).json({
        success: false,
        message: "Admin account already exists. Multiple admins are not allowed.",
      });
    }

    // 2. Create admin
    const admin = await Admin.create({
      email,
      password,
    });

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: "First Admin created successfully",
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during admin creation",
    });
  }
};


// @desc    Step 1: Verify Old Password & Send OTP
// @route   POST /api/auth/change-password/initiate
// @access  Private
export const initiateChangePassword = async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    // 1. Verify Current Password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    // 2. Generate Random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Hash OTP and save to DB (Security Best Practice)
    // We hash it so even DB admins can't see the raw OTP
    admin.resetPasswordOtp = crypto.createHash('sha256').update(otp).digest('hex');
    admin.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes validity

    await admin.save({ validateBeforeSave: false });

    // 4. Send Email
    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4F46E5;">RoleCraft Security</h2>
        <p>You requested to change your password.</p>
        <p>Your Verification Code is:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; background: #f3f4f6; padding: 10px; display: inline-block;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, please secure your account immediately.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: admin.email,
        subject: 'RoleCraft: Password Change Verification Code',
        message,
      });

      res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (err) {
      admin.resetPasswordOtp = undefined;
      admin.resetPasswordOtpExpire = undefined;
      await admin.save({ validateBeforeSave: false });
      return res.status(500).json({ success: false, message: "Email could not be sent" });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Step 2: Verify OTP & Update Password
// @route   PUT /api/auth/change-password/confirm
// @access  Private
export const confirmChangePassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    // 1. Hash the incoming OTP to compare with DB
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const admin = await Admin.findOne({
      _id: req.admin._id,
      resetPasswordOtp: hashedOtp,
      resetPasswordOtpExpire: { $gt: Date.now() }, // Check if not expired
    });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // 2. Set new password
    admin.password = newPassword;
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordOtpExpire = undefined;

    await admin.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// @desc    Forgot Password - Send OTP to Email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      // Security: Return success even if email not found to prevent email enumeration
      return res
        .status(200)
        .json({
          success: true,
          message: "If that email exists, an OTP has been sent.",
        });
    }

    // 1. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hash and Save OTP
    admin.resetPasswordOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    admin.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // 10 Minutes

    await admin.save({ validateBeforeSave: false });

    // 3. Send Email
    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4F46E5;">RoleCraft Password Reset</h2>
        <p>You requested a password reset. Use this code to proceed:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; background: #f3f4f6; padding: 10px; display: inline-block;">${otp}</h1>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    try {
      await sendEmail({
        email: admin.email,
        subject: "RoleCraft: Password Reset Code",
        message,
      });

      res
        .status(200)
        .json({ success: true, message: "OTP sent to your email" });
    } catch (err) {
      admin.resetPasswordOtp = undefined;
      admin.resetPasswordOtpExpire = undefined;
      await admin.save({ validateBeforeSave: false });

      // Dev Mode fallback
      console.log("DEV OTP:", otp);
      return res
        .status(500)
        .json({
          success: false,
          message: "Email could not be sent (Check console for DEV OTP)",
        });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Reset Password - Verify OTP & Update
// @route   PUT /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Hash incoming OTP
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // 2. Find user with this email AND valid OTP
    const admin = await Admin.findOne({
      email,
      resetPasswordOtp: hashedOtp,
      resetPasswordOtpExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // 3. Set New Password
    admin.password = newPassword;
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordOtpExpire = undefined;

    await admin.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset successful. Please login.",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};