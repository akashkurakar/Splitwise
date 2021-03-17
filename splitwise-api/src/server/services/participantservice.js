const participantDb = require("../models/participantmodel");
class Participants {
  addParticipant = async (grpName, user, owner) => {
    try {
      let search = await participantDb.findParticipant(grpName, user);
      if (search.length == 0) {
        let participant = await participantDb.addParticipant(
          user,
          grpName,
          owner
        );
        return "User added as participants!";
      } else {
        return "User already present!";
      }
    } catch (e) {
      console.log(e);
    }
  };
  getParticipant = async (grpId) => {
    try {
      let participants = await participantDb.getParticipant(grpId);
      return participants;
    } catch (e) {
      console.log(e);
    }
  };

  findParticipant = async (grpName, user) => {
    try {
      let participants = await participantDb.findParticipant(grpName, user);
      return participants;
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = Participants;
