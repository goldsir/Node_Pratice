const fs = require("fs");

// 創建目錄
function fsMKDir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
                return resolve(false);
            }
            resolve(true);
        });
    });
}


//判斷檔案是否存在
function fsExists(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, (err) => {
            if (err) {
                resolve(false);
            }
            else{
                resolve(true);
            }
        });
    });
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, "utf8", function (err) {
            if (err) {
                console.log(err);
                resolve(false);
            } else {                
                resolve(true);
            }
        });
    });
}

function readFile(path) {
   return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// 【async function always returns a Promise】
// 【就算是return 1, 也會被包裝成 Promise】

module.exports = {    
    fsMKDir
    , fsExists
    , writeFile
    , readFile
}