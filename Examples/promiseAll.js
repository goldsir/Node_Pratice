const fs = require('fs');
let { readFile, fsReadDir } = require('./fsUtil');


(async function () {


    let files = await fsReadDir('./datas');

    let datas = [];
    for (let i = 0; i < files.length; i++) {
        let data = await readFile('./datas/' + files[i]);
        datas.push(JSON.parse(data));
    }

    console.log(datas);


})();

// 要併發的話，才用promise.all