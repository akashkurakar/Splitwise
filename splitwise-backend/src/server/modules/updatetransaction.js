const Transaction = require("../models/transactionmodel");

async function handle_request(msg, callback) {
  try {
    const expense = await Transaction.find({
      transaction_id: msg.transaction_id,
    });

    let newBillAmt = parseInt(msg.bill_amt / (expense.length + 1));
    await Transaction.updateMany(
      {
        transaction_id: msg.transaction_id,
      },
      {
        $set: {
          bill_amt: msg.bill_amt,
          amount: newBillAmt,
          tran_name: msg.tran_name,
        },
      },
      { upsert: true }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Error while settling transactions!",
          success: false,
        };
        return callback(null, json);
      }
      var json = {
        data: response,
        message: "Transaction Updated",
      };
      return callback(null, json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
