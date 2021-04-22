const Transaction = require("../models/transactionmodel");

async function handle_request(msg, callback) {
  try {
    const owedAmount = await Transaction.aggregate([
      { $match: { owed_name: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          total_amt: { $sum: "$amount" },
          owed_name: { $first: "$owed_name" },
        },
      },
    ]);
    const paidAmount = await Transaction.aggregate([
      { $match: { paid_by: msg, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          total_amt: { $sum: "$amount" },
          paid_by: { $first: "$paid_by" },
        },
      },
    ]);
    if (owedAmount.length !== 0 && paidAmount.length !== 0) {
      let balance = parseFloat(
        paidAmount[0]["total_amt"] - owedAmount[0]["total_amt"]
      );
      result = {
        balance: balance,
        paidAmount: paidAmount[0]["total_amt"],
        owedAmount: owedAmount[0]["total_amt"],
      };
      return callback(null, result);
    } else if (owedAmount.length === 0) {
      let balance = parseFloat(paidAmount[0]["total_amt"]);
      result = {
        balance: balance,
        paidAmount: parseFloat(paidAmount[0]["total_amt"]),
        owedAmount: 0.0,
      };
      return callback(null, result);
    } else if (paidAmount.length === 0) {
      let balance = parseFloat(owedAmount[0]["total_amt"]);
      result = {
        balance: balance,
        owedAmount: parseFloat(owedAmount[0]["total_amt"]),
        paidAmount: 0.0,
      };
      return callback(null, result);
    } else {
      var json = { data: [], message: "" };
      res.send(json);
    }
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
