const User = require("../models/usermodel");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
const secret = "cmpe273_secret_key";

async function handle_request(msg, callback) {
  try {
    var password = bcrypt.hashSync(msg.password, salt);
    msg.password = password;
    const usr = new User(msg);
    await usr.save((err, user) => {
      if (err) {
        var json = {
          data: [],
          message: "User Already Present ! Please Sign in!",
          success: false,
        };
        callback("Error", json);
      } else {
        const payload = { user_id: user._id };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        var json = {
          token: "JWT " + token,
          data: user,
          message: "Use signup successfull",
        };
        callback("Success", json);
      }
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong!");
  }
}
exports.handle_request = handle_request;
