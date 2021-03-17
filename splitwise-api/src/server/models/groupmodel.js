const con = require("../db/db");

let groups = {};

groups.add = async (group) => {
  return new Promise((resolve, reject) => {
    var name = group.grp_name;
    var createdBy = group.user;
    var updatedBy = group.user;
    con.query("USE main;");
    var sql = `INSERT INTO grps (grp_name, created_by, updated_by,image_path) VALUES ('${name}','${createdBy}','${updatedBy}','${group.imgPath}')`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
groups.findAll = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from participants where user_name='${user.user}'`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
groups.find = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from grps as g join participants as p on g.grp_id=p.grp_id where p.user_name=${user.id} and g.grp_name='${user.grp_name}'`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

groups.findByUser = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from grps as g join participants as p on g.grp_id=p.grp_id where p.user_name=${user.id}`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

groups.findGroupByName = async (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `select * from grps where grp_name="${user.grp_name}"`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
groups.approveRequest = async (invite) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `UPDATE participants set status='active' where user_name='${invite.user}' and grp_id='${invite.grp_id}';`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

groups.leaveGroup = async (request) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `UPDATE participants set status='left' where user_name='${request.user}' and grp_id='${request.group}';`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

groups.updateGroup = async (request) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var findQuery = `UPDATE grps set grp_name='${request.grp_name}', image_path = '${request.imgPath}' where grp_id='${request.grp_id}';`;
    con.query(findQuery, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
module.exports = groups;
