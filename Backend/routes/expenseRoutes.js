import express from "express";
import {
    addExpense,
    deleteExpense,
    getExpenses,
} from "../controllers/ExpenseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense)
  .get(protect, getExpenses);

router.delete("/:id", protect, deleteExpense);

export default router;