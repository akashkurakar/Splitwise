
'use strict'

const express = require('express');

const UserService = require('../services/userService');

const GroupService = require('../services/groupService');

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var router = express.Router();

let userService = new UserService();

let groupService = new GroupService();

router.post('/login', jsonParser, async (req, res) => {
    const userObj = req.body;
    try{
        let result = await userService.Login(userObj);
        res.cookie('cookie',userObj.email,{maxAge: 900000, httpOnly: false, path : '/'});
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);

    }

});

router.post('/signup', jsonParser, async (req, res) => {
    const userObj = req.body;
    try{
        let result = await userService.SignUp(userObj);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);

    }
    });

    router.post('/user/update', jsonParser, async (req, res) => {
        const userObj = req.body;
        try{
            let result = await userService.update(userObj);
            res.json(result);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
    
        }
        });
    

    router.get('/user/', async (req, res) => {
        const user = req.query;
        try{
            let result = await userService.getUser(user.id);
            res.json(result);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    
    });
    router.post('/group/create', jsonParser, async (req, res) => {
        const groupObj = req.body;
        try{
            let result = await groupService.createGroup(groupObj);
            res.json(result);
        }catch(e){
            console.log(e);
            res.sendStatus(500);
        }
    
    });
    
module.exports = router;

