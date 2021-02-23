'use strict'
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "splitwise-master.c47djnvlu0si.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "4Mm76iLus8JcgOuB6yYt",
    port:'3306'
});

/*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    /*con.query('CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT,name VARCHAR(30)  NOT NULL, username VARCHAR(30),email VARCHAR(255) NOT NULL,password VARCHAR(30) NOT NULL, phone VARCHAR(15), default_currency VARCHAR(10), image_path VARCHAR(1024),lang VARCHAR(30),timezone VARCHAR(255), PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.query('CREATE TABLE IF NOT EXISTS groups(grp_id INT NOT NULL AUTO_INCREMENT,grp_name VARCHAR(30) NOT NULL,created_by VARCHAR(30),created_on DATE,image_path VARCHAR(1024),updated_by VARCHAR(30),updated_on DATE,PRIMARY KEY(grp_id));', function(error, result, fields) {
        console.log(result);
        console.log(error);
    });
    con.end();
});*/
/*
CREATE DATABASE IF NOT EXISTS main;

USE main;

CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT,name VARCHAR(30)  NOT NULL, username VARCHAR(30),email VARCHAR(255) NOT NULL,password VARCHAR(30) NOT NULL, phone VARCHAR(15), default_currency VARCHAR(10), image_path VARCHAR(1024),lang VARCHAR(30),timezone VARCHAR(255), PRIMARY KEY(id));

CREATE TABLE IF NOT EXISTS groups(grp_id INT NOT NULL AUTO_INCREMENT,grp_name VARCHAR(30) NOT NULL, created_by VARCHAR(30), image_path VARCHAR(1024), updated_by VARCHAR(30), updated_on DATE, PRIMARY KEY(grp_id));

CREATE TABLE IF NOT EXISTS transactions(tran_id INT NOT NULL AUTO_INCREMENT,tran_name VARCHAR(30) NOT NULL,amount INT, paid_by VARCHAR(30) ,group_id VARCHAR(30),owe_id VARCHAR(30),updated_on DATE, PRIMARY KEY(tran_id) );

CREATE TABLE IF NOT EXISTS notifications(noti_id INT NOT NULL AUTO_INCREMENT, invited_by VARCHAR(30) ,invited_to VARCHAR(30),updated_on DATE,group_id VARCHAR(30), PRIMARY KEY(noti_id));

CREATE TABLE IF NOT EXISTS activities(act_id INT NOT NULL AUTO_INCREMENT, activity_name VARCHAR(30) ,user_id VARCHAR(30),status VARCHAR(30), PRIMARY KEY(act_id));

*/