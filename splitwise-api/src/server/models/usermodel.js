const con = require('../db/db')

let user = {};

user.add = async (user) => {
    return new Promise((resolve, reject) => {
        var name = user.name;
        var email = user.email;
        var password = user.password;
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var sql = `INSERT INTO users (name, email, password) VALUES ('${name}','${email}','${password}')`;
            con.query(sql, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });

            con.end();
        })
    });
}
user.update = async (user) => {
    return new Promise((resolve, reject) => {
        var name = user.name;
        var email = user.email;
        var phone = user.phone;
        var language = user.language;
        var timezone = user.timezone;
        var default_currency = user.default_currency;
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var sql = `UPDATE users set name='${name}', email='${email}', phone='${phone}',lang='${language}',timezone='${timezone}',default_currency='${default_currency}' where email='${email}'`;
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

user.find = async (user) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var findQuery = `select * from users where email='${user.email}'`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    return reject(error);
                }
                return resolve(result)

            });
            con.end();

        })

    });
}
user.findByEmail = async (user) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            if (err) {
                return err;
            }
            con.query('USE main;');
            var findQuery = `select * from users where email='${user}'`;
            con.query(findQuery, function (error, result, fields) {
                if (error) {
                    if (err.fatal) {
                        console.trace('fatal error: ' + err.message);
                    }
                    return reject(error);
                }
                return resolve(result)

            });
            con.end();

        })
    });
}

module.exports = user;