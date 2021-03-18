"use strict";
const grpDb = require("../models/groupmodel");
const trnsactDb = require("../models/transactionmodel");
const ParticipantSerice = require("../services/participantservice");
const ActivityService = require("../services/ActivityService");
const UserService = require("./UserService");
const e = require("cors");
let participantSerice = new ParticipantSerice();
let activityService = new ActivityService();
let userService = new UserService();

class GroupService {
  createGroup = async (groupObj) => {
    try {
      let search = await grpDb.find(groupObj);
      if (search.length == 0) {
        let group = await grpDb.add(groupObj);
        let search = await grpDb.findGroupByName(groupObj);
        let owner = await userService.getUserById(groupObj.id);
        let participants = await participantSerice.addParticipant(
          search[0].grp_id,
          groupObj.id,
          true
        );
        for (let user of groupObj.users) {
          let userData = "";
          if (user.name !== "" || user.email !== "") {
            if (user.name !== "") {
              userData = await userService.getUserByName(user.name);
            } else {
              userData = await userService.getUserByEmail(user.email);
            }

            await participantSerice
              .addParticipant(search[0].grp_id, userData.id, false)
              .then((grpparticipant) => {
                if (grpparticipant !== "User added as participants!") {
                  return "Failed to create group!";
                }
              });
          }
          let activity = await activityService.addActivity(
            `${owner.name} created group ${groupObj.grp_name}`,
            userData.id,
            search[0].grp_id
          );
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
      let search = await grpDb.findByUser(user);
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

  updateGroup = async (request) => {
    try {
      let group = await grpDb.updateGroup(request);
      if (group !== "Group already present!") {
        if (request.users.length > 0) {
          let i = 0;
          for (let user of request.users) {
            if (user.name === "" && user.email === "") {
            } else {
              if (user.name === "" && user.email !== "") {
                let search = await userService.getUserByEmail(user.email);
                if (search.length === 0) {
                  return "User not found!";
                }
                let participants = await participantSerice.addParticipant(
                  request.grp_id,
                  search.id,
                  false
                );
                if (participants !== "User added as participants") {
                  return "User already present!";
                }
              } else if (user.name !== "" && user.email === "") {
                let search = await userService.getUserByName(user.name);
                let participants = await participantSerice.addParticipant(
                  request.grp_id,
                  search.id,
                  false
                );

                if (participants !== "User added as participants!") {
                  return "User already present!";
                }
              }
            }
          }
          return "Group updated successfully!";
        }
      } else {
        return "Group with same name is already present!";
      }
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") return "Group already present!";
    }
  };
}

module.exports = GroupService;
