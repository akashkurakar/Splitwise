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

activities.getUserActivitiesLast = async (userid) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from activities where user_name='${userid.user}' order by created_on asc`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

activities.addActivity = async (description, user, groupName) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Insert into activities(user_name,description,grp_id) values ('${user}','${description}','${groupName}')`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

activities.getActivitiesByGroup = async (grp_id, userid) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select * from activities where grp_id='${grp_id}' AND user_name=${userid} order by created_on asc`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
module.exports = activities;
