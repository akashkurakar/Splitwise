const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema(
  {
    grp_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    status: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const participants = mongoose.model("Participants", participantSchema);
module.exports = participants;
