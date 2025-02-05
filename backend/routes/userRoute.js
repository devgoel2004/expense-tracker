const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserDetails,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/getAllUsers").get(getAllUsers);
router
  .route("/profile")
  .get(isAuthenticatedUser, getUserDetails)
  .put(isAuthenticatedUser, updateProfile);
module.exports = router;
