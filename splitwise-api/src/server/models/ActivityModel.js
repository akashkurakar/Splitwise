const con = require("../db/db");

let activities = {};

activities.getUserActivities = async (userid) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from activities where user_name='${userid.user}' order by created_on desc`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

activities.addActivity = async (description, user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Insert into activities(user_name,description) values ('${user}','${description}')`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

module.exports = activities;
