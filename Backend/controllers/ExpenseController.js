import Expense from "../models/Expense.js";

// Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await expense.deleteOne();

    res.json({ message: "Expense deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, amount, category, date, note } = req.body;

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.note = note;

    await expense.save();

    res.json(expense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};