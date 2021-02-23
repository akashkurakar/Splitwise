const con = require('../db/db')

let groups = {};


groups.add = async (group) => {
    return new Promise((resolve, reject) => {
        var name = group.grp_name;
        var createdBy = group.user;
        var updatedBy = group.user;
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var sql = `INSERT INTO grps (grp_name, created_by, updated_by) VALUES ('${name}','${createdBy}','${updatedBy}')`;
            con.query(sql, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
            con.end()
        })
    });
}
groups.find = async (group) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var findQuery = `select * from grps where grp_name='${group.grp_name}'`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
    });
}
module.exports = groups;