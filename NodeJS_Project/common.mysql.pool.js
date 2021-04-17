const mysql = require('mysql');
const fs = require("fs");
const path = require('path');
const common = require('./common');
const endOfLine = require('os').EOL;

const { mySQLPoolOptions } = common.getConfig();
const pool = mysql.createPool(mySQLPoolOptions);

async function getConnection() {

    return new Promise((resolve, reject) => {

        pool.getConnection(function (err, connection) {

            if (err) {
                common.log('poolGetConnectionErr.txt', err);
                resolve(null);
            }else{
				resolve(connection);
			}
        });
    });

}

function executeSQL(sql) {

    return new Promise(async (resolve, reject) => {

        let connection = await getConnection() ;
        connection.query(sql, function (err, results, fields) {

            if (err) {                
                common.log("dbError.txt", `${err}${endOfLine}${endOfLine}`);
                common.log("dbErrorSQL.sql", `${sql}${endOfLine}${endOfLine}`);
				return reject(err);				
            }

            if (results !== undefined && results != null) {
                let resultJSON = JSON.stringify(results);
                let r = JSON.parse(resultJSON);
                resolve(r);
            }
            else {
                resolve([]);
            }
            connection.release();
        });
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
    pool
    , executeSQL
}