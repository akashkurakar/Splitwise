
'use strict'

const express = require('express');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var router = express.Router();

const GroupController = require('../controller/groupcontroller');

const UserController = require('../controller/usercontroller');

const InvitationController = require('../controller/invitationcontroller');

const TransactionController = require('../controller/transactioncontroller');

const ParticipantController = require('../controller/participantcontroller');

const ActivityController = require('../controller/ActivityController');

router.post('/login', jsonParser, UserController.login);

router.post('/signup', jsonParser, UserController.signup);

router.post('/user/update', jsonParser,UserController.update);
    

router.get('/user/',UserController.userByEmail);

router.get('/users/',UserController.user);

router.post('/group/create', jsonParser, GroupController.createGroup);

router.post('/group/leave', jsonParser, GroupController.leaveGroup);

router.get('/groups/', jsonParser, GroupController.getGroups);

router.get('/groups/all', jsonParser, GroupController.getAllGroups);

router.post('/groups/request', jsonParser, GroupController.approveGroupRequest);

router.post('/notify/send', jsonParser, InvitationController.sendInvitation);

router.get('/notify/', jsonParser, InvitationController.sendInvitation);

router.get('/notifications/', jsonParser, InvitationController.getInvitationList);

router.get('/transactions/', jsonParser, TransactionController.getTransaction);

router.get('/balances/', jsonParser, TransactionController.getBalances);

router.post('/transactions', jsonParser, TransactionController.addTransaction);

router.get('/transactions/data', jsonParser, TransactionController.getTotalPaidOwedTransactions);

router.post('/transactions/settle', jsonParser, TransactionController.transactionSettle);

router.get('/participants', jsonParser, ParticipantController.getParticipant);

router.get('/activities', jsonParser, ActivityController.getActivities);


module.exports = router;
    
