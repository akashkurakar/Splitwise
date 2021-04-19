const Activity = require("../models/ActivityModel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  const user = msg.user;
  const page = msg.page;
  const rows = msg.rows;
  const grpId = msg.grpId;
  try {
    let activities = [];
    let totalRows = 0;
    if (grpId !== undefined) {
      totalRows = await Activity.find({ user_name: user });
      activities = await Activity.find({
        user_name: user,
        grp_id: grpId,
      })
        .skip(page * rows)
        .limit(parseInt(rows))
        .sort({ createdAt: -1 });
    } else {
      totalRows = await Activity.find({ user_name: user });
      activities = await Activity.find({
        user_name: user,
      })
        .skip(page * rows)
        .limit(parseInt(rows))
        .sort({ createdAt: -1 });
    }
    var json = {
      data: activities,
      totalRows: totalRows.length,
      message: "",
    };
    callback(null, json);
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
