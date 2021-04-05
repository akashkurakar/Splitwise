const mongoose = require("mongoose");
const { ids } = require("webpack");
const Group = require("../models/groupmodel");
const { user } = require("./usercontroller");
const Participants = require("../models/participantmodel");
const User = require("../models/usermodel");

exports.createGroup = async (req, res) => {
  const groupObj = req.body;
  try {
    const participants = [];
    await User.findOne({ _id: groupObj.id }).then((resp) => {
      participants.push({ user_name: resp._id.toString(), status: "active" });
    });
    const group = await Group.find({ grp_name: groupObj.grp_name });
    if (group.length === 0) {
      for (let usr of groupObj.users) {
        if (usr.name !== "") {
          const user = await User.findOne({ name: usr.name });
          const userid = user._id.toString();
          const status = "PENDING";
          participants.push({ user_name: userid, status: status });
        } else {
          var json = {
            data: [],
            message: "Add at least one user!",
          };
        }
      }
      let groupParticipants = await Participants.insertMany(participants);
      const grp = new Group({
        grp_name: groupObj.grp_name,
        created_by: groupObj.id,
        updated_by: groupObj.id,
        participants: groupParticipants,
      });

      await grp.save(async (err, newGroup) => {
        if (err) {
          var json = {
            data: [],
            message: "Group Already Present !",
          };
          return res.status(400).json(json);
        } else {
          var json = {
            data: newGroup,
            message: "Group Created Successfully!",
          };
          return res.status(200).json(json);
        }
      });
    } else {
      var json = {
        data: [],
        message: "Group Already Present !",
      };
      return res.status(400).json(json);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getGroups = async (req, res) => {
  const user = req.query.id;
  try {
    const result = await Group.aggregate([
      {
        $lookup: {
          from: "participants",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "transactions",
          localField: "transactions",
          foreignField: "_id",
          as: "transactions",
        },
      },
    ]);
    console.log(result);
    if (result.length == 0) {
      var json = {
        data: [],
        message: "No Groups for you!",
      };
      res.status(200).json(json);
      res.end();
    } else {
      var json = {
        data: result,
        message: "",
      };
      res.status(200).json(json);
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
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
    const group = await Group.findById({
      _id: invite.grp_id,
    }).populate("participants");
    let updatedParticipant = group.participants.filter(
      (participant) => participant.user_name === invite.user
    )[0];
    await Participants.findByIdAndUpdate(
      { _id: updatedParticipant._id, user_name: invite.user },
      {
        $set: { status: "active" },
      }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to add participant!",
        };
        return res.status(200).json(json);
      }
      var json = {
        data: response,
        message: "Participant added successfully!",
      };
      res.status(200).json(json);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.leaveGroup = async (req, res) => {
  const groupData = req.body;
  try {
    const group = await Group.findById({
      _id: groupData.group,
    })
      .populate({ path: "participants" })
      .populate({ path: "transactions" });
    for (let transaction of group.transactions) {
      if (
        (transaction.owed_name == groupData.user ||
          transaction.paid_by == groupData.user) &&
        transaction.status === "PENDING"
      ) {
        var json = {
          data: [],
          message: "You can not leave the group before clearing dues",
        };
        return res.status(200).json(json);
      }
    }
    let updatedParticipant = group.participants.filter(
      (participant) => participant.user_name === groupData.user
    )[0];
    await Participants.findByIdAndUpdate(
      { _id: updatedParticipant._id, user_name: groupData.user },
      {
        $set: { status: "left" },
      }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to add participant!",
        };
        return res.status(200).json(json);
      }
      var json = {
        data: response,
        message: "Group Left Successfully",
      };
      res.status(200).json(json);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.updateGroups = async (req, res) => {
  const group = req.body;
  try {
    await Group.save(group).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to update group!",
        };
        return res.status(200).json(json);
      }
      var json = {
        data: response,
        message: "Group updated successfully!",
      };
      res.status(200).json(json);
    });
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
