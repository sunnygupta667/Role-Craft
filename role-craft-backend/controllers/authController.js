import Admin from "../models/Admin.js";
import { generateToken } from "../middleware/auth.js";

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        admin: { id: admin._id, email: admin.email },
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Create first admin (use only once)
// @route   POST /api/auth/create-admin
// @access  Public
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminCount = await Admin.countDocuments();

    if (adminCount > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Admin already exists." });
    }

    const admin = await Admin.create({ email, password });
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: "First Admin created",
      data: { admin: { id: admin._id, email: admin.email }, token },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Change Password (Direct)
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect current password" });
    }

    admin.password = newPassword;
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ---------------------------------------------------------
// 🚨 NEW: Emergency Reset (The "Backdoor")
// @route   POST /api/auth/emergency-reset
// @access  Public (Protected by Master Key)
// ---------------------------------------------------------
export const emergencyReset = async (req, res) => {
  try {
    const { masterKey, newPassword } = req.body;

    // 1. Verify Master Key
    if (!process.env.MASTER_RECOVERY_KEY) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Recovery key not configured on server.",
        });
    }

    if (masterKey !== process.env.MASTER_RECOVERY_KEY) {
      console.log(`⚠️ Failed emergency reset attempt with key: ${masterKey}`);
      return res
        .status(403)
        .json({ success: false, message: "Invalid Master Key" });
    }

    // 2. Find Admin (Assumes single admin)
    const admin = await Admin.findOne();
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "No admin account found to reset." });
    }

    // 3. Force Update Password
    admin.password = newPassword;

    // Clear legacy fields
    admin.resetPasswordOtp = undefined;
    admin.resetPasswordOtpExpire = undefined;

    await admin.save();

    console.log("✅ Emergency password reset triggered successfully.");
    res
      .status(200)
      .json({
        success: true,
        message: "Emergency password reset successful. You can now login.",
      });
  } catch (error) {
    console.error("Emergency reset error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
