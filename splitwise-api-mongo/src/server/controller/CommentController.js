const Transaction = require("../models/transactionmodel");
const Group = require("../models/groupmodel");
const mongoose = require("mongoose");
const Comments = require("../models/commentmodel");

exports.addComment = async (req, res) => {
  const data = req.body;
  try {
    let comment = new Comments();
    comment.comment = data.comment;
    comment.comment_by = data.user;
    comment.transaction_id = data.transaction_id;
    comment.status = "active";

    await comment.save(async (err, newGroup) => {
      if (err) {
        var json = {
          data: [],
          message: "Error while adding comment in group !",
        };
        return res.status(400).json(json);
      } else {
        var json = {
          data: newGroup,
          message: "Comment added successfully!",
        };
        return res.status(200).json(json);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.deleteComments = async (req, res) => {
  const user = req.query;
  try {
    let groups = await activityService.getActivities(user);
    res.json(groups);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.getComments = async (req, res) => {
  const tran_id = req.query.id;
  try {
    const comments = await Comments.find({
      transaction_id: tran_id,
    }).then((comments) => {
      var json = {
        data: comments,
        message: "",
      };
      return res.status(200).json(json);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};
