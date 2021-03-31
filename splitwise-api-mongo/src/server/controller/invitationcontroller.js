const InvitationSerice = require("../services/invitationservice");

let invitationSerice = new InvitationSerice();

exports.sendInvitation=async(req,res)=>{
    const groupObj = req.body;
    try{
        let result = await invitationSerice.sendInvitation(groupObj);
        res.json(result);
       
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}
exports.getInvitationList=async(req,res)=>{
    const user = req.query;
    try{
        let result = await invitationSerice.getInvitation(user);
        res.json(result);
       
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}