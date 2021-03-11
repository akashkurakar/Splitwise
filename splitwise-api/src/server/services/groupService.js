"use strict";
const grpDb = require("../models/groupmodel");
const trnsactDb = require("../models/transactionmodel");
const ParticipantSerice = require("../services/participantservice");
const ActivityService = require("../services/ActivityService");
let participantSerice = new ParticipantSerice();
let activityService = new ActivityService();

class GroupService {
  createGroup = async (groupObj) => {
    try {
      let search = await grpDb.find(groupObj);
      if (search.length == 0) {
        let groups = await grpDb.add(groupObj);
        let group = await grpDb.findGroupByName(groupObj);
        let activity = await activityService.addActivity(
          "created group ",
          groupObj.grp_name,
          groupObj.user
        );
        if (activity !== "User added successfully") {
          return "Failed to create group!";
        }
        let participant = await participantSerice.addParticipant(
          groupObj.grp_name,
          groupObj.user,
          true
        );
        if (participant !== "User added as participants!") {
          return "Failed to create group!";
        }
        groupObj.users.forEach((element) => {
          participant = participantSerice.addParticipant(
            groupObj.grp_name,
            element.name,
            false
          );
          if (participant !== "User added as participants!") {
            return "Failed to create group!";
          }
          activity = activityService.addActivity(
            "created group ",
            groupObj.grp_name,
            element.name
          );
        });
        if (activity !== "User added successfully") {
          return "Failed to create group!";
        }
        return "Group has been created successfully!";
      } else {
        return "Group already present";
      }
    } catch (e) {
      return e;
    }
  };

  getGroups = async (user) => {
    try {
      let search = await grpDb.find(user);
      return search;
    } catch (e) {
      console.log(e);
    }
  };

  getAllGroups = async (user) => {
    try {
      let search = await grpDb.findAll(user);
      return search;
    } catch (e) {
      console.log(e);
    }
  };

  approveGroupRequest = async (invite) => {
    try {
      let search = await grpDb.approveRequest(invite);
      return search;
    } catch (e) {
      console.log(e);
    }
  };

  leaveGroup = async (request) => {
    try {
      let status = await trnsactDb.transactionStatus(request);
      if (status.length === 0) {
        let search = await grpDb.leaveGroup(request);
        return "Success";
      } else {
        return "You cant leave group without clearing dues.";
      }
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = GroupService;
