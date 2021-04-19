const mongoose = require("mongoose");
const Activity = require("../models/ActivityModel");
var kafka = require("../kafka-services/client");

exports.getActivities = async (req, res) => {
  const user = req.query.user;
  const page = req.query.page;
  const rows = req.query.rows;
  const grpId = req.query.groupid;
  const data = { user, page, rows, grpId };
  await kafka.make_request("getactivities", data, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);
      res.end();
    }
  });
};

exports.getActivitiesByGroup = async (req, res) => {
  const user = req.query.userid;
  const page = req.query.page;
  const rows = req.query.rows;
  const grpId = req.query.groupid;
  const data = { user, page, rows, grpId };
  await kafka.make_request(
    "getactivitiesbygroup",
    data,
    function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else" + results);
        res.send(results);
        res.end();
      }
    }
  );
};
