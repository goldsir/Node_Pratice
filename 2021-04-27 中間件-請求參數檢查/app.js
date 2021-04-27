const express = require('express');
let app = express();

app.use(express.static('./web'));
app.use(express.urlencoded({ extended: false }));


/*
app.use(function (req, res, next) {    
    console.log('攔截請求');
    next();
});
*/

app.get('/inputTest', function (req, res) {
    console.log(req.query.email);
    res.json(req.query);
});

app.post('/userAdd', function (req, res) {
    console.log(req.body.email);
    res.json(req.body);
});

app.post('/userLogin', function (req, res) {
    console.log(req.body.email);
    res.json(req.body);
});

app.listen(3000);