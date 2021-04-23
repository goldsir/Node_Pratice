const mysql = require('mysql');
const fs = require("fs");
const path = require('path');
const common = require('./common');
const endOfLine = require('os').EOL;
const { createCipher } = require('crypto');

const { mySQLPoolOptions } = common.getConfig();
const pool = mysql.createPool(mySQLPoolOptions);

async function getConnection() {

    return new Promise((resolve, reject) => {

        pool.getConnection(function (err, connection) {

            if (err) {
                common.log('poolGetConnectionErr.txt', err);
                resolve(null);
            } else {
                resolve(connection);
            }
        });
    });

}

function executeSQL(sql) {

    return new Promise(async (resolve, reject) => {

        try {
            let connection = await getConnection();
            connection.query(sql, function (err, results, fields) {

                try {

                    if (err) {
                        common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
                        common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
                        reject(err);
                    }
                    else if (results !== undefined && results != null) {
                        let resultJSON = JSON.stringify(results);
                        let r = JSON.parse(resultJSON);
                        resolve(r);
                    }
                    else {
                        resolve([]);
                    }
                } catch (err) {
                    common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
                    common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
                    reject(err);
                }
                finally {
                    connection.release();
                }
            });
        } catch (err) {

            common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
            common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
            reject(err);
            connection.release();
        }
    }).catch((err) => {
        common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
        common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
        console.log(err)
    });
}

/*
    executeSQL('select * from `User` ;').catch(err => {
        console.log('----------', err);
    }).then(value => {

        console.log(value);
        pool.end(function (err) {
            // all connections in the pool have ended
        });
    });
*/

module.exports = {
    dbconnectionPool: pool
    , executeSQL
}