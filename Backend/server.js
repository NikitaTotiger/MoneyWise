import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expenses", expenseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("MoneyWise API Running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});