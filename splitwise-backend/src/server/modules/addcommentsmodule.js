const Comments = require("../models/commentmodel");

async function handle_request(msg, callback) {
  try {
    let comment = new Comments();
    comment.comment = msg.comment;
    comment.comment_by = msg.user;
    comment.transaction_id = msg.transaction_id;
    comment.status = "active";

    await comment.save(async (err, newGroup) => {
      if (err) {
        var json = {
          data: [],
          message: "Error while adding comment in group !",
        };
        return callback(null, json);
      } else {
        var json = {
          data: newGroup,
          message: "Comment added successfully!",
        };
        return callback(null, json);
      }
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
