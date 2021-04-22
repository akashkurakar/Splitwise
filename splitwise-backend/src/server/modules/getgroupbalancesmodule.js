const Transaction = require("../models/transactionmodel");
const Group = require("../models/groupmodel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  try {
    const group = await Group.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(msg.grp_id) } },
      {
        $lookup: {
          from: "participants",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
        },
      },
    ]);
    const data = [];
    for (let participant of group[0].participants) {
      const owedAmount = await Transaction.aggregate([
        {
          $match: {
            owed_name: participant.user_name,
            status: "PENDING",
            grp_id: mongoose.Types.ObjectId(msg.grp_id),
          },
        },
        {
          $group: {
            _id: "$owed_name",
            total_amt: { $sum: "$amount" },
            owed_name: { $first: "$owed_name" },
          },
        },
      ]);
      const paidAmount = await Transaction.aggregate([
        {
          $match: {
            paid_by: participant.user_name,
            status: "PENDING",
            grp_id: mongoose.Types.ObjectId(msg.grp_id),
          },
        },
        {
          $group: {
            _id: "$paid_by",
            total_amt: { $sum: "$amount" },
            paid_by: { $first: "$paid_by" },
          },
        },
      ]);
      let sum = 0;
      if (owedAmount[0] !== undefined && owedAmount[0].total_amt != null) {
        sum = sum + owedAmount[0].total_amt;
      }
      if (paidAmount[0] !== undefined && paidAmount[0].total_amt != null) {
        sum = sum - paidAmount[0].total_amt;
      }
      data.push({ user: participant.user_name, total: sum });
    }
    return callback(null, data);
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went werong");
  }
}
exports.handle_request = handle_request;
