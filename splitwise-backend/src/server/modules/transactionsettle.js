const Transaction = require("../models/transactionmodel");
const mongoose = require("mongoose");
const Activity = require("../models/ActivityModel");

async function handle_request(msg, callback) {
  try {
    await Transaction.updateMany(
      {
        $or: [
          {
            paid_by: msg.user1,
            owed_name: msg.user2,
          },
          {
            paid_by: msg.user2,
            owed_name: msg.user1,
          },
        ],
      },
      {
        $set: { status: "settled" },
      }
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
        message: "Transaction Settled",
      };
      const activities = [];
      const activity = new Activity();
      activity.activity_name = "msg settled";
      activity.grp_id = "";
      activity.user_name = msg.user1;
      activity.description = `${msg.user2} settled up with you`;
      activities.push(activity);
      activity.activity_name = "msg settled";
      activity.grp_id = "";
      activity.user_name = msg.user2;
      activity.description = `${msg.user1} settled up woth you`;
      activities.push(activity);
      await Activity.insertMany(activities);
      
      return callback(null, json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
