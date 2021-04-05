const mongoose = require("mongoose");
const Activity = require("../models/ActivityModel");

exports.getActivities = async (req, res) => {
  const user = req.query;
  const page = req.query.page;
  const rows = req.query.rows;
  try {
    const totalRows = await Activity.find({ user_name: user.user });
    const activities = await Activity.find({ user_name: user.user })
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
