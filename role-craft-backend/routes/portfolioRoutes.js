import express from "express";
import {
  getAllPortfolios,
  getPortfolioBySlug,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  togglePortfolioStatus,
} from "../controllers/portfolioController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/public/:slug", getPortfolioBySlug);

// Protected routes
router.use(protect);

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.post("/", createPortfolio);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);
router.patch("/:id/toggle", togglePortfolioStatus);

export default router;
