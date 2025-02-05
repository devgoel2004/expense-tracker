const express = require("express");
const app = require("./app");
// const app = express();
const dotenv = require("dotenv");
const mongoo = require("./config/db");
dotenv.config();
mongoo();
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running", port);
});
