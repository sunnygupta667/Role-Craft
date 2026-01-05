// backend/routes/authRoutes.js
import express from "express";

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

router.post("/login", login);

router.get("/me", protect, getMe);

router.put("/change-password", protect, changePassword);
router.post("/emergency-reset", emergencyReset);


// For security, admin creation route is commented out
// router.post("/create-admin", createAdmin); // Kept commented out for security

export default router;
