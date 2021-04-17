const path = require('path');
let common = require('./common');

let {
    jwtSign
    , jwtVerify
    , uuidv4
} = common;

console.log(uuidv4(), uuidv4().length);
console.log(uuidv4());
console.log(uuidv4());

console.log(path.resolve('./web'));

/*
let data = { "name": "tcliu" };
jwtSign(data)
    .then((token) => {
        console.log(token);
        return token;
    })
    .then((token) => {
        return jwtVerify(token)
    }).then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })
*/