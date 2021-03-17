const con = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let user = {};
const salt = bcrypt.genSaltSync(saltRounds);
user.add = async (user) => {
  return new Promise((resolve, reject) => {
    var name = user.name;
    var email = user.email;
    var password = bcrypt.hashSync(user.password, salt);
    con.query("USE main;");
    var sql = `INSERT INTO users (name, email, password) VALUES ('${name}','${email}','${password}')`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
user.update = async (user) => {
  return new Promise((resolve, reject) => {
    var id = user.id;
    var name = user.name;
    var email = user.email;
    var phone = user.phone;
    var language = user.lang;
    var timezone = user.timezone;
    var default_currency = user.default_currency;
    var image_path = user.image_path;

    con.query("USE main;");
    var sql = `UPDATE users set name='${name}', email='${email}', phone='${phone}',lang='${language}',timezone='${timezone}',image_path='${image_path}',default_currency='${default_currency}' where id='${id}'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

user.findByName = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from users where name='${user}'`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

user.findById = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from users where id='${user}'`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

user.findByEmail = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from users where email='${user}'`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        if (err.fatal) {
          console.trace("fatal error: " + err.message);
        }
        return reject(error);
      }
      return resolve(result);
    });
  });
};

user.findAll = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from users`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        if (err.fatal) {
          console.trace("fatal error: " + err.message);
        }
        return reject(error);
      }
      return resolve(result);
    });
  });
};
module.exports = user;
