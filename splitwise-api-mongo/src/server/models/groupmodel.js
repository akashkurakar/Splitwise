const mongoose = require("mongoose");
const transactions = require("./transactionmodel");

const groupSchema = new mongoose.Schema(
  {
    grp_name: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    image_path: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "active",
    },
    transactions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transactions" },
    ],
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Participants" },
    ],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
