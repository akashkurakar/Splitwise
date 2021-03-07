const GroupService = require("../services/groupService");

const InvitationSerice = require("../services/invitationservice");

const ParticipantSerice = require("../services/participantservice");

const ActivityService = require("../services/ActivityService");

const UserService = require("../services/userService");

let groupService = new GroupService();

let participantSerice = new ParticipantSerice();

let activityService = new ActivityService();

exports.createGroup = async (req, res) => {
    const groupObj = req.body;
    try {
        let group = await groupService.createGroup(groupObj);
        activityService.addActivity("created group",groupObj.grp_name,groupObj.user);
        console.log(group);
        participantSerice.addParticipant(groupObj.grp_name, groupObj.user,true);
        groupObj.users.forEach((element) => { 
            participantSerice.addParticipant(groupObj.grp_name, element.name,false); 
            activityService.addActivity("created group",groupObj.grp_name,element.name);
        });
        res.json(group);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}

exports.getGroups = async (req, res) => {
    const user = req.query;
    try {
        let groups = await groupService.getGroups(user);
        res.json(groups);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}

exports.getAllGroups = async (req, res) => {
    const user = req.query;
    try {
        let groups = await groupService.getAllGroups(user);
        res.json(groups);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}
exports.approveGroupRequest = async (req, res) => {
    const invite = req.body;
    try {
        let groups = await groupService.approveGroupRequest(invite);
        res.json(groups);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}
exports.leaveGroup =async (req,res) => {
    const groupData =  req.body;
    try {
        let groups = await groupService.leaveGroup(groupData);
        res.json(groups);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
}
