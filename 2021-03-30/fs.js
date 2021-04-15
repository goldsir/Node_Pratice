let fs = require('fs');


// 第二個參數: 是一個回調函式
fs.readFile('./a.txt', 'utf-8', (err, data) => {

    if (err) {
        return console.log(err);
    }
    console.log(data);
});


fs.readFile('./b.txt', 'utf-8', (err, data) => {

    if (err) {
        return console.log(err);
    }
    console.log(data);
});


fs.readFile('./c.txt', 'utf-8', (err, data) => {

    if (err) {
        return console.log(err);
    }
    console.log(data);
});

// 它去讀檔案， 不會等結果回傳就會直接往下執行