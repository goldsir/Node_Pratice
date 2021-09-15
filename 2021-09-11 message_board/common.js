const fs = require('fs');
const path = require('path');

function resultMessage(resultCode, resultMessage, result) {
    return {
        resultCode
        , resultMessage
        , result
    }
}

function inputValueCheck(req, res, next) {

    let account = req.query.account || req.body.account;

    try {
        if (typeof account === 'string' && account.length < 4) {
            throw Error('account 長度要 >= 4');
        }
        next();
    } catch (err) {
        res.json(resultMessage(1, err.message));
    }

};

function log(fileName, text) {

    const logFolder = path.join(__dirname, 'log');  // 在自執行函式有創資夾
    const logPath = path.join(logFolder, fileName); // 通通寫到log資料夾中
    fs.appendFile(logPath, `${getYYYYMMDDhhmmss()}\r\n\t${text}\r\n`, "utf8", err => {

        if (err) {
            console.log('寫日誌失敗，哭哭');
        }
    });
}

function getYYYYMMDDhhmmss(_date) {

    /*
        console.log(new Date().toTimeString());
        console.log(new Date().toUTCString());
        console.log(new Date().toISOString());
    */

    _date = _date || new Date();
    let year = _date.getFullYear();
    let month = String(_date.getMonth() + 1); // month value: 0(一月) ~ 11(十二月)
    let date = String(_date.getDate());
    let hour = String(_date.getHours());
    let min = String(_date.getMinutes());
    let second = String(_date.getSeconds());

    if (Number.parseInt(month) < 10) {
        month = `0${month}`;
    }

    if (Number.parseInt(date) < 10) {
        date = `0${date}`;
    }

    if (Number.parseInt(hour) < 10) {
        hour = `0${hour}`;
    }

    if (Number.parseInt(min) < 10) {
        min = `0${min}`;
    }

    if (Number.parseInt(second) < 10) {
        second = `0${second}`;
    }

    return `${year}-${month}-${date} ${hour}:${min}:${second}`;
}


function getPagination(totalRows, pageSize, currentPage, listSize) {

    let totalPages = 0; //總頁數
    let startPage = 0;
    let endPage = 0;


    //計算總頁數
    if (totalRows === 0) {
        totalPages = 1;
    } else if (totalRows % pageSize == 0) {
        totalPages = totalRows / pageSize;
    } else {
        /*取地板值*/
        totalPages = Math.floor(totalRows / pageSize) + 1; //Math.floor() 回傳小於等於所給數字的最大整數
    }

    //防呆: 當前頁次超出總頁數
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    if (totalPages <= listSize) {
        startPage = 1;
        endPage = totalPages;
    } else {

        startPage = currentPage - (listSize / 2) + 1;
        endPage = currentPage + (listSize / 2);

        if (startPage < 1) {
            startPage = 1;
            endPage = listSize;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - (listSize - 1);
        }
    }

    let prePage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1;

    return {
        currentPage
        , startPage
        , endPage
        , prePage
        , nextPage
    };
}


// 自執行一次
(function () {

    const logFolder = path.join(__dirname, 'log');
    if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, {
            recursive: true
        });
    }


})()

module.exports = {
    resultMessage
    , inputValueCheck
    , getYYYYMMDDhhmmss
    , log
    , getPagination
}