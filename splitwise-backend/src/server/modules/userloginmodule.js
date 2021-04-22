const User = require("../models/usermodel");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
const secret = "cmpe273_secret_key";

async function handle_request(msg, callback) {
  console.log("Handle req");
  try {
    await User.find({ email: msg.email }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
          success: false,
        };
        return callback("Error", json);
      } else {
        if (bcrypt.compareSync(msg.password, response[0].password)) {
          const payload = { user_id: response[0]._id };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          var json = {
            token: "JWT " + token,
            data: response[0],
            message: "Login Successfull",
          };
          return callback(null, json);
          //res.status(200).json(token);
        } else {
          var json = {
            data: [],
            message: "Invalid Credentials",
            success: false,
          };
          return callback(err, json);
        }
      }
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}

exports.handle_request = handle_request;
