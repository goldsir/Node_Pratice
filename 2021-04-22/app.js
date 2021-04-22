const {
    fsMKDir
    , fsExists
    , writeFile
    , readFile
    , fsReadDir
} = require('./fsUtil');


(async () => {

    let datas = JSON.parse(await readFile('./datas.json'));

    let datasFileter = datas.filter(data => {
        return /餓/.test(data.Memo);
    });

    console.log(datasFileter);


})()