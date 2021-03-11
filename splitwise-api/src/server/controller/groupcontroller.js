const GroupService = require("../services/groupService");

const InvitationSerice = require("../services/invitationservice");

const ParticipantSerice = require("../services/participantservice");

const ActivityService = require("../services/ActivityService");

const UserService = require("../services/userService");

let groupService = new GroupService();

let participantSerice = new ParticipantSerice();

let activityService = new ActivityService();

exports.createGroup = async (req, res) => {
  const groupObj = req.body;
  try {
    let group = await groupService.createGroup(groupObj);
    if (group === "Group has been created successfully!") {
      var json = { data: [], message: "Group Created Successfully!" };
      res.json(json);
    } else {
      var json = { data: [], message: "Group already present!" };
      res.json(json);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.getGroups = async (req, res) => {
  const user = req.query;
  try {
    let groups = await groupService.getGroups(user);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
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
  try {
    let groups = await groupService.approveGroupRequest(invite);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
exports.leaveGroup = async (req, res) => {
  const groupData = req.body;
  try {
    let groups = await groupService.leaveGroup(groupData);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
