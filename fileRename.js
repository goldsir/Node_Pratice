const fs = require('fs');
const path = require('path');

let base = 'G:\\我的雲端硬碟\\教學視頻';
let dir = 'Node.JS高級';
let _path = path.join(base, dir);

//22年最强手写Vue3源码【从零实现】-第1集-1_vue3的基本概念和设计理念
let removePartReg = /Nodejs全栈开发之nodejs 高级编程-第\d{1,2}集-/;
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
            let newFileName = fileName.replace(removePartReg, '');
            let newPath = path.resolve(_path, newFileName);
            console.log(newPath);
            fs.rename(oldPath, newPath, () => {
                console.log("File Renamed!");
            });
        }
    })
})