const Group = require("../models/groupmodel");
const Participants = require("../models/participantmodel");

async function handle_request(msg, callback) {
  try {
    const group = await Group.findById({
      _id: msg.grp_id,
    }).populate("participants");
    let updatedParticipant = group.participants.filter(
      (participant) => participant.user_name === msg.user
    )[0];
    await Participants.findByIdAndUpdate(
      { _id: updatedParticipant._id, user_name: msg.user },
      {
        $set: { status: "active" },
      }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to add participant!",
        };
        callback(null, json);
      }
      var json = {
        data: response,
        message: "Participant added successfully!",
      };
      callback(null, json);
    });
  } catch (e) {
    console.log(e);
    callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
