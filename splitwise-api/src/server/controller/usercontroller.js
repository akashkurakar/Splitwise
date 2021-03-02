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
            res.status(403);
            res.json( {data:[],message:"Invalid Credentials"});
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
        res.json(result);

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
        res.json(result);

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
        res.sendStatus(500);
    }
    res.end();
}