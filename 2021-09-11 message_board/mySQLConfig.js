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
    , "charset": 'utf8mb4'
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
        console.log(`${err}${endOfLine}${endOfLine}`);
        log('DBError.txt', `${err}${endOfLine}${endOfLine}`);
        return 'dbError'
    }
    //----------------------------------------------
    try {
        return await query(connection, sql);
    }
    catch (err) {
        console.log(`${err}${endOfLine}${endOfLine}`);
        console.log(`${sql}${endOfLine}${endOfLine}`);
        log('SQLError.txt', `${err}${endOfLine}${endOfLine}`);
        log('SQLError.txt', `${sql}${endOfLine}${endOfLine}`);
        return 'dbError'
    }
}

module.exports = {
    executeSQL
    , escape: mysql.escape      // 會轉掉特殊符號
    , escapeId: mysql.escapeId  // 會加上``
    , pool
}