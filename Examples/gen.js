const fs = require('fs');

function fsReadFile(filePath) {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {

            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

function* myGen() {
    let aResult = yield fsReadFile('./a.txt');
    console.log(aResult);
    let bResult = yield fsReadFile('./b.txt');
    console.log(bResult);
    let cResult = yield fsReadFile('./c.txt');
    console.log(cResult);
}

function autoRun(gen) {

    let gr = gen();

    function next(data) {

        let result = gr.next(data);
        if (result.done) {
            return result.value
        }

        result.value.then((val) => {
            next(val);
        });
    }

    next();
}

autoRun(myGen);