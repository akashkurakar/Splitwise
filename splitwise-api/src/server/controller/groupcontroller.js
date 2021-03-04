const GroupService = require("../services/groupService");

const InvitationSerice = require("../services/invitationservice");

const ParticipantSerice = require("../services/participantservice");

const UserService = require("../services/userService");

let groupService = new GroupService();

let invitationSerice = new InvitationSerice();

let userervice = new UserService();

let participantSerice = new ParticipantSerice();

exports.createGroup = async (req, res) => {
    const groupObj = req.body;
    try {
        let group = await groupService.createGroup(groupObj);
        //let user = await userervice.getUserByEmail(element.name)
        console.log(group);
        participantSerice.addParticipant(groupObj.grp_name, groupObj.user,true);
        groupObj.users.forEach((element,index) => {
            
            participantSerice.addParticipant(groupObj.grp_name, element.name,false);
           
        });
        //invitationSerice.sendInvitation(group.insertId, groupObj.user, groupObj.users);
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
