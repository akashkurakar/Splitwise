const con = require('../db/db');

var moment = require('moment');

    var transaction={};

    transaction.getTransactionByGroup=(grpName)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                con.query("SET sql_mode = ''");
                var sql = `Select * from transactions where grp_name='${grpName}' group by created_on`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.getTransactionByUser=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `Select * from transactions where paid_by='${user}' OR owed_name= '${user}' order by updated_on desc`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.getOwedTransactionByUser=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `Select sum(amount) from transactions where owed_name='${user}' and status='PENDING'`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.getPaidTransactionByUser=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `Select sum(amount) from transactions where paid_by='${user}' and status='PENDING'`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.getTotalPaidTransactionByUser=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `Select owed_name,sum(amount) as total_amt from transactions where paid_by='${user}' and status='PENDING' group by owed_name`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.getTotalOwedTransactionByUser=(user)=>{
        return new Promise((resolve, reject) => {
           
                con.query('USE main;');
                var sql = `Select paid_by,sum(amount) as total_amt from transactions where owed_name='${user}' and status='PENDING' group by paid_by`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            })
    }
    transaction.addTransaction=(users,grpName,transaction)=>{
        return new Promise((resolve, reject) => {
           let amt = parseFloat(transaction.amount)/users.length;
           let createDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
           console.log(createDate);
                con.query('USE main;');
                users.forEach(element => {
                    if(element.user_name!==transaction.user){
                    var sql = `Insert into transactions (tran_name,amount,paid_by,grp_name,owed_name,created_on,bill_amt,status) values ('${transaction.description}',${amt},'${transaction.user}','${grpName}','${element.user_name}','${createDate}','${transaction.amount}','PENDING')`;
                con.query(sql, function (error, result, fields) {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result)
    
                });
            }
                });
                
            })
    }
    transaction.transactionSettle=(transaction)=>{
        return new Promise((resolve, reject) => {
           
            con.query('USE main;');
            var sql = `update transactions set status="settled" where (paid_by="${transaction.user1}" and owed_name="${transaction.user2}") OR (paid_by="${transaction.user2}" and owed_name="${transaction.user1}")`;
            con.query(sql, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
        })
    }

module.exports = transaction;