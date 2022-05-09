const mysql = require('mysql');
const endOfLine = require('os').EOL;

/*
    
    字符集 
        utf8mb4
        utf8mb4_general_ci
    CREATE DATABASE emoj DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci

    show variables like '%character%'
        

*/

const connectionOptions = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "ixwn4uwc",
    "database": "test",
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
                console.log(`${err}${endOfLine}${endOfLine}`);
                console.log(`${sql}${endOfLine}${endOfLine}`);
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

        // 能正常連線才能執行SQL
        try {
            let data = await query(connection, sql);
            return { error: null, data }
        }
        catch (error) {
            console.log(`${sql}${endOfLine}${endOfLine}`);
            console.log(`${err}${endOfLine}${endOfLine}`);
            return { error, data: null }
        }
    }
    catch (error) {
        console.log(`${err}${endOfLine}${endOfLine}`);
        return { error, data: null }
    }
}

module.exports = {
    executeSQL
    , pool
}