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