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
      callback(null, json);
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
