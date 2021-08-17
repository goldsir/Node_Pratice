const fs = require('fs').promises;

// 資料
let data = {
    name: 'Jess'
    , age: '22'
    , action: '餔嚕餔嚕餔嚕'
}

// html字串樣版，把資料填進去
let htmlStr = `
    <h1>姓名:${data.name}</h1>
    <h1>年齡:${data.age}</h1>
    <h1 style="color:blue">動作:${data.action}</h1>
`

fs.writeFile('./123.html', htmlStr);  // 用chrome打開123.html