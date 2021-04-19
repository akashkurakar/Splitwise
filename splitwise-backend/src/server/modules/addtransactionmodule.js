const Transaction = require("../models/transactionmodel");
const mongoose = require("mongoose");
const User = require("../models/usermodel");
const Group = require("../models/groupmodel");
const Activity = require("../models/ActivityModel");

async function handle_request(msg, callback) {
  try {
    const tran_id = makeid();
    const activities = [];
    const group = await Group.findById({
      _id: msg.grpId,
    }).populate({
      path: "participants",
    });
    const newExpense = [];
    const activeMembers = group.participants.filter(
      (usr) => usr.status === "active"
    );
    for (let participant of group.participants) {
      const tran = {};
      const user = User.findById({ _id: msg.user });

      if (participant.user_name.toString() !== msg.user) {
        const activity = new Activity();
        if (participant.status === "active") {
          activity.activity_name = "msg added";
          activity.grp_id = msg.grpId;
          activity.user_name = participant.user_name;
          activity.description = `${user.name} added expense as ${msg.description} in ${group.grp_name}`;
          tran.tran_name = msg.description;
          tran.amount = msg.amount / activeMembers.length;
          tran.bill_amt = msg.amount;
          tran.paid_by = msg.user;
          tran.owed_name = participant.user_name;
          tran.transaction_id = tran_id;
          tran.status = "PENDING";
          tran.grp_id = msg.grpId;
          newExpense.push(tran);
        } else {
          activity.activity_name = "msg added";
          activity.grp_id = msg.grpId;
          activity.user_name = msg.user;
          activity.description = `You paid for ${msg.description} in ${group.grp_name}`;
        }
        activities.push(activity);
        //  group.transactions.push(tran);
      }
    }
    if (newExpense.length < 1) {
      var json = {
        data: [],
        message: "No more than one member active!",
      };
      callback(null, json);
    }
    let groupTransactions = await Transaction.insertMany(newExpense);
    await Activity.insertMany(activities);
    await Group.findByIdAndUpdate(
      { _id: msg.grpId },
      {
        $push: { transactions: groupTransactions },
      }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "User Already Present ! Please Sign in!",
        };
        callback(null, json);
      }
      var json = {
        data: response,
        message: "Expenses added successfully!",
      };
      callback(null, json);
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
exports.handle_request = handle_request;
