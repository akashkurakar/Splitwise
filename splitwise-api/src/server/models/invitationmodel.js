
const con = require('../db/db')

class InvitationModel {
    
     getNotifcation=()=>{

    }

    sendInvitation=(groupId,userId,users)=>{
        return new Promise((resolve, reject) => {
            var invited_by = userId;
            var group_id =groupId;
            users.forEach(element => {
                con.query('USE main;');
                var sql = `INSERT INTO notifications (invited_by, invited_to,grp_id) VALUES ('${invited_by}','${element.name}','${group_id}')`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            });
           
            })
    }

    getInvitation=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `select * from participants inner join grps on participants.grp_name=grps.grp_name where participants.user_name='${user.user}' AND participants.status='PENDING'`
                //`select * from pa inner join notifications n on grps.grp_id = n.grp_id where invited_to='${user.user}' AND status=""`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                        return resolve(result)
    
                });
            
           
            })
    }
}
module.exports= InvitationModel;