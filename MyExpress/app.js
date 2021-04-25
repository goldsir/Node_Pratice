const express = require('./express');
let app = express();

app.use(function (req, res, next) {

    console.log(1);
    next();
    console.log(2);

});

app.use(function (req, res, next) {

    console.log('a');

});

app.listen(3000);