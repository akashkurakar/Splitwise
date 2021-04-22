const Comments = require("../models/commentmodel");

async function handle_request(msg, callback) {
  try {
    const comments = await Comments.find({
      transaction_id: msg,
      status: "active",
    }).then((comments) => {
      var json = {
        data: comments,
        message: "",
      };
      return callback(null, json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
