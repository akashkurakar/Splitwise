const con = require('../db/db')

let groups = {};


groups.add = async (group) => {
    return new Promise((resolve, reject) => {
        var name = group.grp_name;
        var createdBy = group.user;
        var updatedBy = group.user;
       
            con.query('USE main;');
            var sql = `INSERT INTO grps (grp_name, created_by, updated_by) VALUES ('${name}','${createdBy}','${updatedBy}')`;
            con.query(sql, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
   
}
groups.findAll = async (user) => {
    return new Promise((resolve, reject) => {
       
            con.query('USE main;');
            var findQuery = `select * from participants where user_name='${user.user}'`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
   
}
groups.find = async (user) => {
    return new Promise((resolve, reject) => {
       
            con.query('USE main;');
            var findQuery = `select * from participants where user_name='${user.id}' AND status='active'`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
   
}
groups.approveRequest = async (invite) => {
    return new Promise((resolve, reject) => {
       
            con.query('USE main;');
            var findQuery = `UPDATE participants set status='active' where user_name='${invite.user}' and grp_name='${invite.grp_id}';`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
   
}
module.exports = groups;