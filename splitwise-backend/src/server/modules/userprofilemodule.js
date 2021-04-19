const User = require("../models/usermodel");

async function handle_request(msg, callback) {
  console.log(`Handle req: ${msg}`);
  try {
    const usr = new User(msg);
    await usr.save((err, user) => {
      if (err) {
        var json = {
          data: [],
          message: "Email with same ID already present!",
          success: false,
        };
        callback("Error", json);
      }
      var json = {
        data: user,
        message: "Use signup successfull",
      };
      callback("Success", json);
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}

exports.handle_request = handle_request;
