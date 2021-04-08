const User = require("../models/usermodel");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const KafkaService = require("../kafka-services/kafka-producer");
const jwt = require("jsonwebtoken");
const secret = "cmpe273_secret_key";

const { auth } = require("../utils/passport");

auth();
exports.login = async (req, res) => {
  const userObj = req.body;
  try {
    await User.find({ email: userObj.email }).then((response, err) => {
      if (response.length == 0) {
        var json = {
          data: [],
          message: "User Not Present ! Please Sign Up!",
        };
        return res.status(401).json(json);
      } else {
        if (bcrypt.compareSync(userObj.password, response[0].password)) {
          const payload = { user_id: response[0]._id };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          var json = {
            token: "JWT " + token,
            data: response[0],
            message: "Login Successfull",
          };
          res.status(200).end(JSON.stringify(json));
          //res.status(200).json(token);
        } else {
          var json = { data: [], message: "Invalid Credentials" };
          res.status(401).json(json);
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
  try {
    var password = bcrypt.hashSync(userObj.password, salt);
    userObj.password = password;
    const usr = new User(userObj);
    await KafkaService.sendRecord({ topic: "user", data: userObj });
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
      } else {
        var json = {
          data: response[0],
          message: "",
        };
        return res.status(200).json(json);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.users = async (req, res) => {
  const name = req.query.name;
  const email = req.query.email;
  try {
    if (name !== undefined) {
      await User.find({ name: { $regex: name, $options: "i" } }).then(
        (response, err) => {
          if (response.length == 0) {
            var json = {
              data: [],
              message: "User Not Present ! Please Sign Up!",
            };
            res.status(400).json(json);
          } else {
            var json = {
              data: response,
              message: "",
            };
            res.status(200).json(json);
          }
        }
      );
    } else if (email !== undefined) {
      await User.find({ email: { $regex: email, $options: "i" } }).then(
        (response, err) => {
          if (response.length == 0) {
            var json = {
              data: [],
              message: "User Not Present ! Please Sign Up!",
            };
            res.status(400).json(json);
          } else {
            var json = {
              data: response,
              message: "",
            };
            res.status(200).json(json);
          }
        }
      );
    } else {
      await User.find().then((response, err) => {
        if (response.length == 0) {
          var json = {
            data: [],
            message: "User Not Present ! Please Sign Up!",
          };
          res.status(400).json(json);
          res.end();
        } else {
          var json = {
            data: response,
            message: "",
          };
          res.status(200).json(json);
          res.end();
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
