const con = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let user = {};
const salt = bcrypt.genSaltSync(saltRounds);
const mongoose = require("mongoose");
const groups = require("./groupmodel");
const transactions = require("./transactionmodel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image_path: {
      type: String,
    },
    default_currency: {
      type: String,
      default: "USD",
    },
    language: {
      type: String,
      default: "ENGLISH",
    },
    timezone: {
      type: String,
      default: "GMT",
    },
    //  groups: [groups],
    // transactions: [transactions],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
