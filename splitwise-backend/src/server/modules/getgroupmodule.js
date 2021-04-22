const Group = require("../models/groupmodel");

async function handle_request(msg, callback) {
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
    if (result.length == 0) {
      var json = {
        data: [],
        message: "No Groups for you!",
      };
      return callback(null, json);
    } else {
      var json = {
        data: result,
        message: "",
      };
      return callback(null, json);
    }
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}

exports.handle_request = handle_request;
