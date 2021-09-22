const mysql = require('mysql');
const endOfLine = require('os').EOL;
const { log } = require('./common');

const connectionOptions = {
    "host": "192.168.202.1",
    "user": "root",
    "password": "ixwn4uwc",
    "database": "message_board",
    "timezone": 8,
    "connectionLimit": 50,
    "multipleStatements": false
}

const pool = mysql.createPool(connectionOptions);

function getConnection() {

    return new Promise((resolve, reject) => {

        pool.getConnection((err, connection) => {

            if (err) {
                reject(err);
            }
            else {
                resolve(connection);
            }
        });

    });
}

function query(connection, sql) {

    return new Promise((resolve, reject) => {

        connection.query(sql, function (err, results, fields) {

            try {

                if (err) {
                    console.log(`${err}${endOfLine}${endOfLine}`);
                    console.log(`${sql}${endOfLine}${endOfLine}`);
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
                log('SQLError.txt', `${err}${endOfLine}${endOfLine}`);
                log('SQLError.txt', `${sql}${endOfLine}${endOfLine}`);
                reject(err);
            }
            finally {
                connection.release();
            }
        });
    });
}


async function executeSQL(sql) {

    let connection = null;
    try {
        connection = await getConnection();
    }
    catch (err) {
        log('DBError.txt', `${err}${endOfLine}${endOfLine}`);
        log('DBError.txt', `${sql}${endOfLine}${endOfLine}`);
        return 'dbError'
    }
    //----------------------------------------------
    try {
        return await query(connection, sql);
    }
    catch (err) {
        log('SQLError.txt', `${err}${endOfLine}${endOfLine}`);
        log('SQLError.txt', `${sql}${endOfLine}${endOfLine}`);
        return 'dbError'
    }
}

module.exports = {
    executeSQL
    , pool
}