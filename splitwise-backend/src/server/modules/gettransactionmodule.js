const Transaction = require("../models/transactionmodel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  try {
    let paidAmount = "";
    /* if (user !== undefined) {
      result = await Transaction.find({
        paid_by: user,
        owed_name: user,
      });
    } else {*/
    // mongoose.set("debug", true);

    await Transaction.aggregate([
      {
        $match: {
          grp_id: mongoose.Types.ObjectId(msg),
          status: "PENDING",
        },
      },

      {
        $group: {
          _id: "$transaction_id",

          trans: { $first: "$$ROOT" },
        },
      },
      { $sort: { "trans.createdAt": -1 } },
    ])
      .exec()
      .then((response, err) => {
        if (err) {
          var json = {
            data: [],
            message: "Something went wrong",
            success: false,
          };
          callback("Error", json);
        }
        var json = {
          data: response,
          message: "",
        };
        callback(null, json);
      });
    //}
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
exports.handle_request = handle_request;
