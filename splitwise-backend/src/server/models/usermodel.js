const mongoose = require("mongoose");

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
