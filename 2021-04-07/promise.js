let fs = require('fs');

function readFile(file) {

    return new Promise((resolve, rejectg) => {

        fs.readFile(file, { encoding: 'utf8' }, function (err, data) {

            resolve(data);
        });
    });

}

readFile('a.txt').then((data) => {
    console.log(data);

});

console.log(readFile);  //PENDING



/*
fs.readFile('a.txt', { encoding: 'utf8' }, function (err, data) {


    console.log(data);
    fs.readFile('b.txt', { encoding: 'utf8' }, function (err, data) {


        console.log(data);
        fs.readFile('c.txt', { encoding: 'utf8' }, function (err, data) {


            console.log(data);
        })
    })
});*/

