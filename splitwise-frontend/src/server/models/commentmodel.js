const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    comment_by: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const comments = mongoose.model("Comments", commentSchema);
module.exports = comments;
