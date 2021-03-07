
const con = require('../db/db')

let activities = {};


activities.getUserActivities=async(userid)=>{
    return new Promise((resolve, reject) => {
        con.query('USE main;');
        var findQuery = `select * from activities where user_name='${userid.user}'`;
        con.query(findQuery, function (error, result, fields) {
            if (error) {
                return reject(error);
            }
            return resolve(result)

        });
    })
}

activities.addActivity=async(description,group,user)=>{
    return new Promise((resolve, reject) => {
        con.query('USE main;');
        let desc = `${user} ${description} ${group}`;
        var sql = `Insert into activities(user_name,description,activity_name) values ('${user}','${desc}','${description}')`;
        con.query(sql, function (error, result, fields) {
            if (error) {
                return reject(error);
            }
            return resolve(result)

        });
    })
}

module.exports = activities;