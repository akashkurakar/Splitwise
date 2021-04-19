const Comments = require("../models/commentmodel");

async function handle_request(msg, callback) {
  try {
    await Comments.deleteOne({ _id: msg }).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to delete comment!",
        };
        callback(null, json);
      }
      var json = {
        data: response,
        message: "Comment deleted successfully!",
      };
      callback(null, json);
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong!");
  }
}
exports.handle_request = handle_request;
