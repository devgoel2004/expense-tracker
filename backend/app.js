const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/user", userRoute);
app.use("/expense", expenseRoute);
module.exports = app;
