const express = require('express');
const inputTest = require('./inputTest');
let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//app.use = 請求攔截 (濾網)
app.use(inputTest);


app.get('/', function (req, res) {

    // 我要有id， 但是外面沒有傳進來
    let Id = req.query.Id || req.body.Id;
    if (typeof Id === 'undefined' || Id.length == 0) {
        res.json(resultMessage(1, '請輸入Id'));
    }

    res.json(resultMessage(0, 'Id通過檢查', Id));

    res.end();


});



app.listen(3000);

function resultMessage(resultCode, resultMessage, result) {
    return {
        resultCode
        , resultMessage
        , result
    }
}
