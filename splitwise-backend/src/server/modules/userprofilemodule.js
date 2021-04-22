const User = require("../models/usermodel");

async function handle_request(msg, callback) {
  console.log(`Handle req: ${msg}`);
  try {
    const usr = new User(msg);
    await usr.update({ _id: msg._id, upsert: true }, (err, user) => {
      if (err) {
        var json = {
          data: [],
          message: "Email with same ID already present!",
          success: false,
        };
        return callback("Error", json);
      }
      var json = {
        data: user,
        message: "User update successfull",
      };
      return callback("Success", json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}

exports.handle_request = handle_request;
