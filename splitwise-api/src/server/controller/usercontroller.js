const UserService = require('../services/userService');

let userService = new UserService();


exports.login = async (req, res) => {
    const userObj = req.body;
    try {
        let result = await userService.Login(userObj);
        if(result!== 'Invalid credentials'){
            var json = {data:result,message:"Login Successfull"};
            res.json(json);
        }else{
            res.status(400).send({
                "message":"Invalid Credentials!"
            });
           
        }
       

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
};

exports.signup = async (req, res) => {
    const userObj = req.body;
    try {
        let result = await userService.SignUp(userObj);
        if(result==='User already present'){
            res.status(400).send({
                "message":"User already Present! Please Login!"
            });
        }else{
            var json = {data:result,message:"Signup Successfull"};
            res.json(json);
        }
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);

    }
    res.end();
};

exports.update = async (req, res) => {
    const userObj = req.body;
    try {
        let result = await userService.update(userObj);
        if(result==="User updation failed"){
            res.status(400).send({
                "message":"User updation failed"
            });
        }else{
            var json = {data:result,message:"Update Successfull"};
            res.json(json);
        }
        

    } catch (e) {
        console.log(e);
        res.sendStatus(500);

    }
    res.end();
};

exports.userByEmail = async (req, res) => {
    const user = req.query;
    try {
        let result = await userService.getUserByEmail(user.id);
        res.json(result);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
};

exports.user = async (req, res) => {
    const user = req.query;
    try {
        let result = await userService.getUsers()
        res.json(result);

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    res.end();
};
exports.getUser = async (req, res) => {
    const user = req.query;
    try {
        let users = await userService.getUser(user.id);
        res.cookie('users', users, { maxAge: 900000, httpOnly: false, path: '/' });
        res.json(users);

    } catch (e) {
        console.log(e);
        res.send(400).send({
            "message":"Something went wrong!"
        });
    }
    res.end();
}