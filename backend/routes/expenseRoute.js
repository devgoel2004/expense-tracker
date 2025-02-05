const express = require("express");
const { isAuthenticatedUser } = require("../middleware/authentication");
const {
  createExpense,
  getAllUserExpense,
  getSingleExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
} = require("../controllers/expenseController");
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, createExpense)
  .get(isAuthenticatedUser, getAllUserExpense);

router.route("/get/all/expense").get(isAuthenticatedUser, getAllExpenses);
router
  .route("/:id")
  .get(isAuthenticatedUser, getSingleExpense)
  .put(updateExpense)
  .delete(isAuthenticatedUser, deleteExpense);
module.exports = router;
