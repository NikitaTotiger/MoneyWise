import express from "express";
import { getAIInsights } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/insights", protect, getAIInsights);

export default router;