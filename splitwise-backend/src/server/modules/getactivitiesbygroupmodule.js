const Activity = require("../models/ActivityModel");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  const group = msg.grpId;
  const user = msg.user;
  const page = msg.page;
  const rows = msg.rows;
  try {
    const totalRows = await Activity.find({
      user_name: mongoose.Types.ObjectId(user),
      grp_id: mongoose.Types.ObjectId(group),
    });
    const activities = await Activity.find({
      user_name: mongoose.Types.ObjectId(user),
      grp_id: mongoose.Types.ObjectId(group),
    })
      .skip(page * rows)
      .limit(parseInt(rows))
      .sort({ createdAt: -1 });
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
