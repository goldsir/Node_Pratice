const fs = require('fs');
const path = require('path');

let _path = 'G:\\我的雲端硬碟\\教學視頻\\手寫vue3源碼_2'
//22年最强手写Vue3源码【从零实现】-第1集-1_vue3的基本概念和设计理念
let removePartReg = /^22年最强手写Vue3源码【从零实现】-第\d{1,2}集-/;
let extensionReg = /\.mp4$/;

fs.readdir(_path, (err, filesName) => {

    if (err) return console.log(err);

    filesName.forEach(fileName => {


        let test1 = removePartReg.test(fileName);
        let test2 = extensionReg.test(fileName);
        console.log(test1);

        if (test1 && test2) {

            let oldPath = path.resolve(_path, fileName);
            let newFileName = fileName.replace(removePartReg, '');
            let newPath = path.resolve(_path, newFileName);
            console.log(newPath);
            fs.rename(oldPath, newPath, () => {
                console.log("File Renamed!");
            });
        }
    })
})