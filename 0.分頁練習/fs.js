let fs = require('fs');

/*
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
*/
// 它去讀檔案， 不會等結果回傳就會直接往下執行



fs.readFile('./a.txt', 'utf-8', (err, data) => {

    if (err) {
        return console.log(err);
    }
    console.log(data);

    fs.readFile('./b.txt', 'utf-8', (err, data) => {

        if (err) {
            return console.log(err);
        }
        console.log(data);

        fs.readFile('./c.txt', 'utf-8', (err, data) => {

            if (err) {
                return console.log(err);
            }
            console.log(data);

            fs.readFile('./c.txt', 'utf-8', (err, data) => {

                if (err) {
                    return console.log(err);
                }
                console.log(data);

                fs.readFile('./c.txt', 'utf-8', (err, data) => {

                    if (err) {
                        return console.log(err);
                    }
                    console.log(data);

                    fs.readFile('./c.txt', 'utf-8', (err, data) => {

                        if (err) {
                            return console.log(err);
                        }
                        console.log(data);
                    });
                });
            });
        });
    });
});



//Primose

var read = function (filename) {
    var promise = new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function (err, data) {

            if (err) {
                reject(err);
            }
            resolve(data);
        })
    });
    return promise;
}

read('./a.txt')
    .then(function (data) {
        console.log(data);
        return read('./b.txt');
    })
    .then(function (data) {
        console.log(data);
        return read('./c.txt');
    })
    .then(function (data) {
        console.log(data);
    });

//如果有一個結果是失敗的 後面的then不執行