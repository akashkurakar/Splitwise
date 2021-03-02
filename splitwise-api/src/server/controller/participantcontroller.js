
const ParticipantService = require("../services/participantservice");

let participantService = new ParticipantService();

exports.addParticipant=async(req,res)=>{
    const participant = req.body;
    try{
        let result = await participantService.addParticipant(groupObj);
        res.json(result);
       
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}
exports.getParticipant=async(req,res)=>{
    const participant = req.body;
    try{
        let result = await participantService.getParticipant(groupObj);
        res.json(result);
       
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}