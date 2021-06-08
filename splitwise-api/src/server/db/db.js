const mysql = require("mysql");

/*con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Akash@123",
  port: "3306",
*/
const con = mysql.createConnection({
  host: "splitwise-master.c47djnvlu0si.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "",
  port: "3306",
});

module.exports = con;
