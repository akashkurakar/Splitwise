const con = require("../db/db");

let participants = {};

participants.addParticipant = (user, grpName, owner) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = "";
    if (owner) {
      sql = `INSERT INTO participants (grp_id, user_name,status) VALUES ('${grpName}','${user}','active')`;
    } else {
      sql = `INSERT INTO participants (grp_id, user_name) VALUES ('${grpName}','${user}')`;
    }

    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

participants.getParticipant = (grpName) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select * from participants where grp_id='${grpName}' AND status='active'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

participants.findParticipant = (grpName, user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select * from participants where grp_id='${grpName}' AND user_name='${user}'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

module.exports = participants;
