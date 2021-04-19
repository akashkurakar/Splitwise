const Group = require("../models/groupmodel");
const Participants = require("../models/participantmodel");
const User = require("../models/usermodel");

async function handle_request(msg, callback) {
  const participants = [];
  try {
    let oldGroup = await Group.find({ grp_name: msg.grp_name }).populate(
      "participants"
    );
    if (msg.users.length > 0) {
      for (let usr of msg.users) {
        if (usr.name !== "") {
          const user = await User.findOne({ name: usr.name });
          const userid = user._id.toString();
          const status = "PENDING";
          if (
            oldGroup[0].participants.filter((usr) => usr.user_name === userid)
              .length > 0
          ) {
            var json = {
              data: [],
              message: "User already present in group!",
            };
            return callback(null, json);
          }
          participants.push({ user_name: userid, status: status });
        } else {
          var json = {
            data: [],
            message: "Add at least one user!",
          };
          return callback(null, json);
        }
      }
    }
    let groupParticipants = await Participants.insertMany(participants);
    groupParticipants.forEach((element) => {
      oldGroup[0].participants.push(element);
    });
    oldGroup[0].name = msg.grp_name;
    oldGroup[0].image_url = msg.imgPath;
    await Group.updateOne(oldGroup[0]).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to update group!",
          success: false,
        };
        callback(null, json);
      }
      var json = {
        data: response,
        message: "Group updated successfully!",
      };
      return callback(null, json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}

exports.handle_request = handle_request;
