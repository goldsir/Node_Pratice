const mysql = require('mysql');
const fs = require("fs");
const path = require('path');
const common = require('./common');
const endOfLine = require('os').EOL;

function executeSQL(sql) {

    return new Promise((resolve, reject) => {

        const { mySQLOptions } = common.getConfig()
        let connection = mysql.createConnection(mySQLOptions);

        connection.query(sql, function (err, results, fields) {

            if (err) {

                common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
                common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
                return reject(err);;
            }

            if (results !== undefined && results != null) {
                let resultJSON = JSON.stringify(results);
                let r = JSON.parse(resultJSON);
                //console.log(sql, "查詢結果");
                //console.log(r);
                resolve(r);
            }
            else {
                //console.log(sql, "查詢失敗");
                resolve([]);
            }

            connection.end(function (err) {
                if (err) {
                    common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
                }
            });
        });
    });
}


/*
    executeSQL('select * from `User` ;').catch(err => {
        console.log('----------', err);
    });
*/

module.exports = {
    executeSQL
}