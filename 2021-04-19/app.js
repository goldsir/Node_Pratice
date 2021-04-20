const fs = require('fs');

let quote = [
    '這個人大GG'
    , '嚶嚶嚶嚶嚶嚶'
    , '賴皮鬼'
    , '一把眼淚一把鼻涕'
    , '肚子餓就鬧脾氣'
];

let accountPrefix = 'Jess';

let result = [];
for (let i = 1; i <= 123; i++) {

    let accountEnd = '0'.padStart(3, '0') + i;
    accountEnd = accountEnd.slice(-4);
    let account = accountPrefix + accountEnd;

    let obj = {
        Id: i
        , UserName: account
        , Memo: quote[Math.ceil(Math.random() * 4)]
    }

    result.push(obj);
}

fs.writeFile('./datas.json', JSON.stringify(result), { endcoding: 'utf8' }, (err) => { });

let r10 = result.find((element) => {
    return element.Id = 10
})

r10.UserName = 'RRRRRRRRRR'
console.log(result);

