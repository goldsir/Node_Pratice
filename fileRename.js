const fs = require('fs');
const path = require('path');

let _path = 'G:\\我的雲端硬碟\\教學視頻\\尚硅谷Vue2.0+Vue3.0全套教程'
let reg = /尚硅谷Vue2.0\+Vue3.0全套教程丨vuejs从入门到精通-第\d{1,3}集-/;

fs.readdir(_path, (err, filesName) => {

    if (err) return console.log(err);

    filesName.forEach(fileName => {

        if (reg.test(fileName)) {

            let newFileName = fileName.replace(reg, '')
            newFileName = newFileName.replace(/\-1080P /, '');

            let oldPath = path.resolve(_path, fileName);
            let newPath = path.resolve(_path, newFileName);
            console.log(newPath);
            fs.rename(oldPath, newPath, () => {
                console.log("\nFile Renamed!\n");
            });
        }

    })
})