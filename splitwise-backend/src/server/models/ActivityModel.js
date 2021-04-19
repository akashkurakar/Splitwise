const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activity_name: {
      type: String,
      required: true,
    },
    grp_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const comments = mongoose.model("Activity", activitySchema);
module.exports = comments;
