/*
當前資料夾需要有package.json
若沒有， 需在命令行模式中執行 npm init -y

安裝 node-fectch套件

    npm install node-fetch --save

ctrl + `  : 在vscode中打開命令行模式
 */

const fetch = require("node-fetch");

fetch(
    "http://localhost:3000/api"
)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));





/*

http請求方法 : https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods
最常用為 get、post，需加強理解
*/