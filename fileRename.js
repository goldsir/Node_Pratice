const fs = require('fs');
const path = require('path');

let base = 'G:\\我的雲端硬碟\\教學視頻';
let dir = '哈利波特 - 中英雙字幕\\1 - 哈利波特與魔法石';
let _path = path.join(base, dir);

let removePartReg = /Chapter/;
let extensionReg = /\.mp4$/;

fs.readdir(_path, (err, filesName) => {

    if (err) return console.log(err);

    filesName.forEach(fileName => {

        let test1 = removePartReg.test(fileName);
        let test2 = extensionReg.test(fileName);
        //console.log(test1);
        //console.log(test2);

        if (test1 && test2) {

            let oldPath = path.resolve(_path, fileName);
            let newFileName = fileName.replace(removePartReg, '').trim();
            let newPath = path.resolve(_path, newFileName);
            console.log(newPath);
            fs.rename(oldPath, newPath, (err) => {
                if (err) return console.log(err);
                console.log("File Renamed!");
            });
        }
    })
})