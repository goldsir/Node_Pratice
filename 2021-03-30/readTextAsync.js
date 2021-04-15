let fs = require('fs');

function readFile(filename) {

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


async function readFileInOrder(i) {

    let aResult = await readFile('./a.txt');
    console.log(i, aResult);
    let bResult = await readFile('./b.txt');
    console.log(i, bResult);
    let cResult = await readFile('./c.txt');
    console.log(i, cResult);

}

for (let i = 0; i < 10; i++) {
    readFileInOrder(i);
}
