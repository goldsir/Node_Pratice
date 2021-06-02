const fs = require('fs');


function readFile(file) {

    return new Promise((resolve, reject) => {

        fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {

            if (err) {
                reject(err);
            }
            else {

                resolve(data);
            }
        })
    });
}

async function start() {
    let files = ['./a.txt', './b.txt', './c.txt'];
    for (let i = 0; i < files.length; i++) {
        let data = await readFile(files[i]);
        console.log(data);
    }
}

(async function () {
    for (let i = 1; i <= 3; i++) {
        await start()
    }
})()



/*
    連續3次調用 start(),  但執行結果並沒有按aaa/bbb/cc 順序顯示， 請修正。


    正確結果應為
        aaa
        bbb
        ccc
        aaa
        bbb
        ccc
        aaa
        bbb
        ccc
*/