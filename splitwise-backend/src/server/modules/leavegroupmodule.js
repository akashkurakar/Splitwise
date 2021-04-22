const Group = require("../models/groupmodel");
const Participants = require("../models/participantmodel");

async function handle_request(msg, callback) {
  try {
    const group = await Group.findById({
      _id: msg.group,
    })
      .populate({ path: "participants" })
      .populate({ path: "transactions" });
    for (let transaction of group.transactions) {
      if (
        (transaction.owed_name == msg.user ||
          transaction.paid_by == msg.user) &&
        transaction.status === "PENDING"
      ) {
        var json = {
          data: [],
          message: "You can not leave the group before clearing dues",
          success: false,
        };
        return callback(null, json);
      }
    }
    let updatedParticipant = group.participants.filter(
      (participant) => participant.user_name === msg.user
    )[0];
    await Participants.findByIdAndUpdate(
      { _id: updatedParticipant._id, user_name: msg.user },
      {
        $set: { status: "left" },
      }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Not able to add participant!",
          success: false,
        };
        return callback(null, json);
      }
      var json = {
        data: response,
        message: "Group Left Successfully",
      };
      return callback(null, json);
    });
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
