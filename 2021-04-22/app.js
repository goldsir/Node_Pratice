const {
    fsMKDir
    , fsExists
    , writeFile
    , readFile
    , fsReadDir
} = require('./fsUtil');


let searchKeyWord = '餓';
var re = new RegExp(searchKeyWord);


(async () => {

    let datas = JSON.parse(await readFile('./datas.json'));

    let datasFileter = datas.filter(data => {
        return re.test(data.Memo);
    });

    console.log(datasFileter);


})()