const NotifyDb = require('../models/invitationmodel');

const notifyDb = new NotifyDb();

class InvitationSerice{
    sendInvitation =async(groupId,userId,users)=>{
        try{
          let groups = await notifyDb.sendInvitation(groupId,userId,users);
            return groups;   
        }catch(e){
            console.log(e);
        }
}
getInvitation =async(user)=>{
    try{
      let groups = await notifyDb.getInvitation(user);
        return groups;   
    }catch(e){
        console.log(e);
    }
}
}
module.exports= InvitationSerice;