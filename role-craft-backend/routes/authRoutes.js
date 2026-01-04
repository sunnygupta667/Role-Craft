// backend/routes/authRoutes.js
import express from "express";
import rateLimit from "express-rate-limit";

// Add changePassword to the import list
import {
  login,
  getMe,
  createAdmin,
  changePassword,
  emergencyReset,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests
  message: "Too many login attempts, please try again after 15 minutes",
});

router.post("/login", loginLimiter, login);

router.get("/me", protect, getMe);

router.put("/change-password", protect, changePassword);
router.post("/emergency-reset", emergencyReset);


// For security, admin creation route is commented out
// router.post("/create-admin", createAdmin); // Kept commented out for security

export default router;
