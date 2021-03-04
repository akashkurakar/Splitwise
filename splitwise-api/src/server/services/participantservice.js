
const participantDb = require('../models/participantmodel')
class Participants{
    addParticipant=async(grpName,user,owner)=>{
        try{
            let participant = await participantDb.addParticipant(user,grpName,owner);
              return participant;   
          }catch(e){
              console.log(e);
          }
    }
    getParticipant=async(grpName)=>{
        try{
            let participants = await participantDb.getParticipant(grpName);
              return participants;   
          }catch(e){
              console.log(e);
          }
    }
}

module.exports= Participants;