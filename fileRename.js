const fs = require('fs');
const path = require('path');

let _path = 'G:\\我的雲端硬碟\\教學視頻\\尚硅谷 - 尚品匯'
let fileNameReg = /^尚硅谷VUE项目实战，前端项目\-尚品汇\(大型_重磅\)\-第\d{1,3}集\-/;
let extensionReg = /\.mp4$/;

fs.readdir(_path, (err, filesName) => {

    if (err) return console.log(err);

    filesName.forEach(fileName => {

        if (extensionReg.test(fileName) && fileNameReg.test(fileName)) {

            let oldPath = path.resolve(_path, fileName);
            let newFileName = fileName.replace(fileNameReg, '');
            let newPath = path.resolve(_path, newFileName);
            console.log(newPath);
            fs.rename(oldPath, newPath, () => {
                console.log("File Renamed!");
            });
        }
    })
})