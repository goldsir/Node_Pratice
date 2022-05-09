npm install webpack webpack-cli --save-dev
npm install html-webpack-plugin --save-dev
npm install copy-webpack-plugin@9.* --save-dev
npm install mini-css-extract-plugin --save-dev
npm install webpack-dev-server --save-dev
npm install mini-css-extract-plugin --save-dev
npm install css-loader --save-dev


webpack中，一個檔案就是一個模塊

webpack只能理解 .js、.json文件，其它模塊需要有loader支援

在根目錄建立 webpack.config.js
 __dirname 是指當前文件(webpack.config.js)所在目錄

 
 loader本質是個函式，接收源文件， 返回一個js源文件模塊


 常用插件
    html-webpack-plugin