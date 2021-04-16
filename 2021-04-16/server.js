const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let { fsExists, writeFile } = require('./fsUtil');
let urlencodedParser = bodyParser.urlencoded({ extended: false })


const app = express();
app.use(express.static('web'));

app.post('/register', urlencodedParser, async (req, res) => {

    let { username, phone, password, passwordCheck } = req.body;

    let fileName = path.join('.', 'datas', username + '.json');

    console.log(fileName);

    let fileExists = await fsExists(fileName);  // 判斷檔案是否存在 

    if (fileExists === false) {// 帳號沒被註冊過

        await writeFile(fileName, JSON.stringify({ username, phone, password, passwordCheck }));
        res.json({
            resultCode: 0
            , resultMessage: '帳號註冊成功'
        });
    }
    else {
        res.json({
            resultCode: 1
            , resultMessage: '帳號被已使用'
        });
    }
});

app.listen(3000);