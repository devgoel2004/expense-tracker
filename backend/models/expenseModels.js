const mongoose = require("mongoose");
const { getDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transport",
      "Bills",
      "Entertainment",
      "Shopping",
      "Restaurant",
      "Others",
    ],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
  },
});
module.exports = mongoose.model("Expense", expenseSchema);
