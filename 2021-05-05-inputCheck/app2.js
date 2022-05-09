const express = require('express');
let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    console.log('攔截請求(1)----------------------')
    console.log(req.query);
    console.log(req.body);
    let Id = req.query.Id || req.body.Id;
    console.log(''.length);
    try {
        if (typeof Id === 'string' && Id.length > 0) {

            let tryParseId = parseInt(Id);
            if (isNaN(tryParseId)) {
                throw Error('Id須為數字');
            }

        }
        next();
    } catch (err) {

        res.json(resultMessage(1, err.message));
    }
});

app.use(function (req, res, next) {
    console.log('攔截請求(2)----------------------')
    console.log(req.query);
    console.log(req.body);
    next();
});

app.get('/', function (req, res) {

    let Id = req.query.Id || req.body.Id;
    if (typeof Id === 'undefined' || Id.length == 0) {
        res.json(resultMessage(1, '請輸入Id'));
    }

    res.json(resultMessage(0, 'Id通過檢查', Id));

});


function resultMessage(resultCode, resultMessage, result) {
    return {
        resultCode
        , resultMessage
        , result
    }
}

app.listen(3000);