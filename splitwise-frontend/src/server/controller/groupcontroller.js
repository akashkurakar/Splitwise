var kafka = require("../kafka-services/client");

exports.createGroup = async (req, res) => {
  const groupObj = req.body;
  await kafka.make_request("creategroup", groupObj, function (err, results) {
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

exports.getGroups = async (req, res) => {
  const user = req.query.id;
  await kafka.make_request("getgroup", user, function (err, results) {
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

exports.getAllGroups = async (req, res) => {
  const user = req.query;
  try {
    let groups = await groupService.getAllGroups(user);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.approveGroupRequest = async (req, res) => {
  const invite = req.body;

  await kafka.make_request(
    "approvegrouprequest",
    invite,
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

exports.leaveGroup = async (req, res) => {
  const groupData = req.body;

  await kafka.make_request("leavegroup", groupData, function (err, results) {
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

exports.updateGroups = async (req, res) => {
  const group = req.body;

  await kafka.make_request("updategroup", group, function (err, results) {
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
