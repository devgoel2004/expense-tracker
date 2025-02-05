const Expense = require("../models/expenseModels");

//CREATE EXPENSE
exports.createExpense = async (req, res, next) => {
  try {
    const { amount, category, date, description } = req.body;
    if (!amount || !category) {
      return res.status(401).json({
        success: false,
        message: "amount or category is required",
      });
    }
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      date,
      description,
    });
    await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expense = await Expense.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
//GET ALL EXPENSES
exports.getAllUserExpense = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const filter = { user: req.user.id };
    if (category) {
      filter.category = category;
    }
    const expenses = await Expense.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });
    const totalExpense = await Expense.countDocuments(filter);
    res.status(200).json({
      success: true,
      expenses,
      totalPages: Math.ceil(totalExpense / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//GET A SINGLE EXPENSE
exports.getSingleExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE AN EXPENSE
exports.updateExpense = async (req, res, next) => {
  try {
    const { amount, date, description, category } = req.body;
    const updatedExpense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { amount, date, description, category }
    );
    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "updated successfully",
      updatedExpense,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE AN EXPENSE
exports.deleteExpense = async (req, res, next) => {
  try {
    const deleteExpense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deleteExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
