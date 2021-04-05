const UserService = require("../services/UserService");
const User = require("../models/usermodel");

let userService = new UserService();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const producer = require("../kafka-services/kafka-connect");

exports.login = async (req, res) => {
  const userObj = req.body;
  try {
    await User.find({ email: userObj.email }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(400).json(json);
        res.end();
      } else {
        if (bcrypt.compareSync(userObj.password, response[0].password)) {
          var json = { data: response[0], message: "Invalid Credentials" };
          res.status(200).json(json);
          res.end();
        } else {
          var json = { data: [], message: "Invalid Credentials" };
          res.status(400).json(json);
          res.end();
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.signup = async (req, res) => {
  const userObj = req.body;
  /* await producer
      .send({
        topic: "user-signup",
        messages: [{ value: JSON.stringify(req.body) }],
      })
      .then((response, err) => {
        console.log(response);
      });

    
    kafka.make_request("user", req.body, function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        res.json({
          updatedList: results,
        });

        res.end();
      }
    });*/

  try {
    var password = bcrypt.hashSync(userObj.password, salt);
    userObj.password = password;
    const usr = new User(userObj);
    //  / await KafkaService.sendRecord({ topic: "user", data: userObj });
    await usr.save((err, user) => {
      if (err) {
        var json = {
          data: [],
          message: "User Already Present ! Please Sign in!",
        };
        return res.status(400).json(json);
      }
      var json = {
        data: user,
        message: "Use signup successfull",
      };
      res.status(200).json(json);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const userObj = req.body;
  try {
    let result = await userService.update(userObj);
    if (result === "User updation failed") {
      res.status(400).send({
        message: "User updation failed",
      });
    } else {
      var json = { data: result, message: "Update Successfull" };
      res.json(json);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.userByEmail = async (req, res) => {
  const user = req.query;
  try {
    const usr = User.find({ email: user }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(400).json(json);
        res.end();
      } else {
        var json = {
          data: response[0],
          message: "",
        };
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.userById = async (req, res) => {
  const user = req.query.id;
  try {
    const usr = User.find({ _id: user }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(400).json(json);
        res.end();
      } else {
        var json = {
          data: response[0],
          message: "",
        };
        return res.status(200).json(json);
        res.end();
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.user = async (req, res) => {
  const user = req.query;
  try {
    const usr = User.find({ _id: user }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(400).json(json);
        res.end();
      } else {
        var json = {
          data: response[0],
          message: "",
        };
        return res.status(200).json(json);
        res.end();
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.users = async (req, res) => {
  const user = req.query;
  try {
    const usr = User.find().then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(400).json(json);
        res.end();
      } else {
        var json = {
          data: response,
          message: "",
        };
        return res.status(200).json(json);
        res.end();
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
