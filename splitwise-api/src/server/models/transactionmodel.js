const con = require("../db/db");

var moment = require("moment");
const user = require("./usermodel");

var transaction = {};

transaction.getTransactionByGroup = (grpName) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    con.query("SET sql_mode = ''");
    var sql = `Select * from transactions where grp_id='${grpName}' AND status!='setteled' group by transaction_id order by created_on desc`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getTransactionByUser = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select * from transactions where (paid_by='${user}' OR owed_name= '${user}') order by updated_on desc`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getOwedTransactionByUser = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select sum(amount) from transactions where owed_name='${user}' and status='PENDING'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getPaidTransactionByUser = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select sum(amount) from transactions where paid_by='${user}' and status='PENDING'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
transaction.getTotalPaidTransactionByUser = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select owed_name,sum(amount) as total_amt from transactions where paid_by='${user}' and status='PENDING' group by owed_name`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getTotalOwedTransactionByUser = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select paid_by,sum(amount) as total_amt from transactions where owed_name='${user}' and status='PENDING' group by paid_by`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getTotalOwedTransactionByUserInGroup = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select t.owed_name,g.grp_name,sum(t.amount) as total_amt from transactions as t join grps as g on t.grp_id=g.grp_id where t.paid_by='${user}' AND t.status='PENDING' group by t.owed_name,t.grp_id`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.getTotalOweTransactionByUserInGroup = (user) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `Select t.paid_by,g.grp_name,sum(t.amount) as total_amt from transactions as t join grps as g on g.grp_id=t.grp_id where t.owed_name='${user}' AND t.status='PENDING' group by t.paid_by,t.grp_id`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.addTransaction = (users, grpId, transaction) => {
  return new Promise((resolve, reject) => {
    let tran_id = makeid();
    let amt = parseFloat(transaction.amount) / users.length;
    let createDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    con.query("USE main;");
    users.forEach((element) => {
      if (element.user_name !== transaction.user) {
        if (users.length > 0) {
          var sql = `Insert into transactions (transaction_id,tran_name,amount,paid_by,grp_id,owed_name,created_on,bill_amt,status) values ('${tran_id}','${transaction.description}',${amt},'${transaction.user}','${grpId}','${element.user_name}','${createDate}','${transaction.amount}','PENDING')`;
          con.query(sql, function (error, result, fields) {
            if (error) {
              return reject(error);
            }
            return resolve(result);
          });
        } else {
          return reject("No more users are there in group");
        }
      }
    });
  });
};
transaction.transactionSettle = (transaction) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `update transactions set status="setteled" where (paid_by="${transaction.user1}" and owed_name="${transaction.user2}") OR (paid_by="${transaction.user2}" and owed_name="${transaction.user1}")`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.userGroupBalanceOwed = (grp_id, user_name) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select sum(amount) as total from transactions where grp_id=${grp_id} and owed_name='${user_name}' and status='PENDING'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.userGroupBalancePaid = (grp_id, user_name) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select sum(amount) as total from transactions where grp_id=${grp_id} and paid_by='${user_name}' and status='PENDING'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

transaction.transactionStatus = (transaction) => {
  return new Promise((resolve, reject) => {
    con.query("USE main;");
    var sql = `select * from transactions where (paid_by='${transaction.user}' OR owed_name='${transaction.user}') AND status="PENDING" AND grp_id='${transaction.group}'`;
    con.query(sql, function (error, result, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
module.exports = transaction;
