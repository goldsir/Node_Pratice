const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const { join } = require('path');

const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, 'dist');

const dirContent = fs.readdirSync(srcPath);
const htmlWebpackPluginItems = [];

dirContent.forEach(fileName => {
    if (/\.html$/.test(fileName)) {

        let options = {
            template: join(srcPath, fileName)
            , chunks: ['commons', fileName.replace(/\.html$/, '')] // 用去尾才安全， split('.') 會踩雷
            , filename: join(distPath, fileName)
        }
        //console.log(options);  // 方便排查
        let hp = new HtmlWebpackPlugin(options);
        htmlWebpackPluginItems.push(hp);
    }
});

//console.log(process.env.NODE_ENV);

module.exports = htmlWebpackPluginItems;
