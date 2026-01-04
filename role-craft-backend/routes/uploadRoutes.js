import express from "express";
import { uploadResume, uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Protected routes
router.use(protect);

router.post("/resume/:portfolioId", upload.single("resume"), uploadResume);
router.post("/image/:portfolioId", upload.single("image"), uploadImage);

export default router;
