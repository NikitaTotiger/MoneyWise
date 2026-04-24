import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/ExpenseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense)
  .get(protect, getExpenses);

router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;