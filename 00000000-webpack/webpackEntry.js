const { join } = require('path');
const srcPath = join(__dirname, 'src');
const jsPath = join(srcPath, 'js');
const fs = require('fs');

const dirContent = fs.readdirSync(jsPath);
let entry = {};

dirContent.forEach(fileName => {
    if (/\.js$/.test(fileName)) {

        let key = fileName.replace(/\.js$/, '');  // 用去尾才安全， split('.') 會踩雷
        let targetName = join(jsPath, fileName);
        entry[key] = targetName;
    }
});

console.log(entry);

module.exports = entry;