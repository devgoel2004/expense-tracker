const User = require("../models/userModels");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
//REGISTER USER
exports.registerUser = async (req, res, next) => {
  try {
    const { firstname, secondname, email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return res.status(401).json({
        success: false,
        message: "user exists",
      });
    }
    const user = await User.create({
      firstName: firstname,
      secondName: secondname,
      email,
      password,
    });
    sendEmail({
      email,
      subject: "Welcome to expense tracker",
      message: `
      Dear ${firstname},

Welcome to Expense Tracker! We’re thrilled to have you on board. Managing your expenses just got easier and smarter. 🚀

With Expense Tracker, you can:
✅ Track your daily expenses effortlessly
✅ Categorize spending for better insights
✅ Set budgets and stay in control
✅ Access your data anytime, anywhere

If you have any questions, feel free to reach out to our support team at [support email].

Happy tracking!
The Expense Tracker Team
      `,
    });
    const token = user.getJWTToken();
    res.status(201).json({
      success: true,
      message: "User Register successfull",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//LOGIN USER
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Please enter email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGOUT USER
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//GET USER DETAILS
exports.getUserDetails = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//UPDATE PROFILE
exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, secondName, email, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const userUpdate = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName,
        secondName,
        email,
      }
    );
    res.status(200).json({
      success: true,
      message: "Updated successfully",
      userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

//GET ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
