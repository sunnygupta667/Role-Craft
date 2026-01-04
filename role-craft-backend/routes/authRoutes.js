// backend/routes/authRoutes.js
import express from "express";
// Add changePassword to the import list
import {
  login,
  getMe,
  createAdmin,
  initiateChangePassword,
  confirmChangePassword,
  forgotPassword, 
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/change-password/initiate", protect, initiateChangePassword);
router.put("/change-password/confirm", protect, confirmChangePassword);

// ✅ Public Routes for Forgot Password
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

// For security, admin creation route is commented out
// router.post("/create-admin", createAdmin); // Kept commented out for security

export default router;
