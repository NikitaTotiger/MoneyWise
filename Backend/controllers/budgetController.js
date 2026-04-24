import User from "../models/User.js";

// Get Budget
export const getBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ budget: user.budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save Budget
export const saveBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.budget = req.body.budget;
    await user.save();
    res.json({ budget: user.budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};