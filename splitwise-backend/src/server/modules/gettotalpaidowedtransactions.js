const Transaction = require("../models/transactionmodel");

async function handle_request(msg, callback) {
  try {
    const owedAmount = await Transaction.aggregate([
      { $match: { owed_name: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          paid_by: { $first: "$paid_by" },
          owed_name: { $first: "$owed_name" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmount = await Transaction.aggregate([
      { $match: { paid_by: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmoutninGroup = await Transaction.aggregate([
      { $match: { paid_by: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const owedAmoutninGroup = await Transaction.aggregate([
      { $match: { owed_name: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          paid_by: { $first: "$paid_by" },
          owed_name: { $first: "$owed_name" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const data = {
      oweData: paidAmount,
      owedData: owedAmount,
      oweList: paidAmoutninGroup,
      owedList: owedAmoutninGroup,
    };
    callback(null, data);
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
