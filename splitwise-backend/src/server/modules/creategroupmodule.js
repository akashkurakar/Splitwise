const Group = require("../models/groupmodel");
const Participants = require("../models/participantmodel");
const User = require("../models/usermodel");

async function handle_request(msg, callback) {
  try {
    const participants = [];
    await User.findOne({ _id: msg.id }).then((resp) => {
      participants.push({ user_name: resp._id.toString(), status: "active" });
    });
    const group = await Group.find({ grp_name: msg.grp_name });
    if (group.length === 0) {
      for (let usr of msg.users) {
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
        grp_name: msg.grp_name,
        created_by: msg.id,
        updated_by: msg.id,
        participants: groupParticipants,
      });

      await grp.save(async (err, newGroup) => {
        if (err) {
          var json = {
            data: [],
            message: "Group Already Present !",
          };
          return callback(null, json);
        } else {
          var json = {
            data: newGroup,
            message: "Group Created Successfully!",
          };
          return callback(null, json);
        }
      });
    } else {
      var json = {
        data: [],
        message: "Group Already Present !",
      };
      return callback(null, json);
    }
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
