const mongoose = require("mongoose");
require("dotenv").config();
const mongoo = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("Not able to connect", err);
    });
};
module.exports = mongoo;
