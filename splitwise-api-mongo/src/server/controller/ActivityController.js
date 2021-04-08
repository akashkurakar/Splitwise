const mongoose = require("mongoose");
const Activity = require("../models/ActivityModel");

exports.getActivities = async (req, res) => {
  const user = req.query;
  const page = req.query.page;
  const rows = req.query.rows;
  const grpId = req.query.groupid;
  try {
    let activities = [];
    let totalRows = 0;
    if (grpId !== undefined) {
      totalRows = await Activity.find({ user_name: user.user });
      activities = await Activity.find({
        user_name: user.user,
        grp_id: grpId,
      })
        .skip(page * rows)
        .limit(parseInt(rows));
    } else {
      totalRows = await Activity.find({ user_name: user.user });
      activities = await Activity.find({
        user_name: user.user,
      })
        .skip(page * rows)
        .limit(parseInt(rows));
    }
    var json = {
      data: activities,
      totalRows: totalRows.length,
      message: "",
    };
    res.status(200).json(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getActivitiesByGroup = async (req, res) => {
  const group = req.query.groupid;
  const user = req.query.userid;
  const page = req.query.page;
  const rows = req.query.rows;
  try {
    const totalRows = await Activity.find({
      user_name: user,
      grp_id: group,
    });
    const activities = await Activity.find({
      user_name: user,
      grp_id: group,
    })
      .skip((page - 1) * rows)
      .limit(parseInt(rows));

    var json = {
      data: activities,
      totalRows: totalRows.length,
      message: "",
    };
    res.status(200).json(json);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
