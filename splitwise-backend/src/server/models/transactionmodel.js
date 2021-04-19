const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      required: true,
    },
    tran_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paid_by: {
      type: String,
      required: true,
    },
    grp_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    bill_amt: {
      type: Number,
      required: true,
    },
    owed_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  },
  { timestamps: true }
);

const transactions = mongoose.model("Transactions", transactionSchema);
module.exports = transactions;
