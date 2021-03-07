'use strict';
const grpDb = require('../models/groupmodel');
const trnsactDb = require("../models/transactionmodel");

class GroupService {

    createGroup = async (group) => {
        try {
            let search = await grpDb.find(group);
            if (search.length == 0) {
                let groups = await grpDb.add(group);
                return groups;
            } else {
                return "Group already present";
            }
        } catch (e) {
            console.log(e);
        }
    }
    getGroups = async (user) => {
        try {
            let search = await grpDb.find(user);
            return search;

        } catch (e) {
            console.log(e);
        }
    }
    getAllGroups = async (user) => {
        try {
            let search = await grpDb.findAll(user);
            return search;

        } catch (e) {
            console.log(e);
        }
    }

    approveGroupRequest = async (invite) => {
        try {
            let search = await grpDb.approveRequest(invite);
            return search;

        } catch (e) {
            console.log(e);
        }
    }

    leaveGroup = async (request) => {
        try {
            let status = await trnsactDb.transactionStatus(request);
            if (status.length === 0) {
                let search = await grpDb.leaveGroup(request);
                return "Success";
            } else {
                return "You cant leave group without clearing dues."
            }


        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = GroupService;