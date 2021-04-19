const User = require("../models/usermodel");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
const secret = "cmpe273_secret_key";
var kafka = require("../kafka-services/client");

const { auth } = require("../utils/passport");

auth();
exports.login = async (req, res) => {
  const userObj = req.body;
  await kafka.make_request("login", userObj, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);
      res.end();
    }
  });
};

exports.signup = async (req, res) => {
  const userObj = req.body;
  await kafka.make_request("signup", userObj, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);

      res.end();
    }
  });
};

exports.update = async (req, res) => {
  const userObj = req.body;
  await kafka.make_request("profileupdate", userObj, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);

      res.end();
    }
  });
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
