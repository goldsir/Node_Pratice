const { join } = require('path');
const htmlWebpackPluginItems = require('./webpackHtmlWebpackPluginItems')
const entry = require('./webpackEntry');
const CopyPlugin = require("copy-webpack-plugin");

// __dirname 是指當前文件(webpack.config.js)所在目錄
const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, 'dist');

module.exports = {

    entry: entry
    , output: {
        path: distPath                                 // 一定要絕對路徑, 輸出的js怎麼再分目錄
        , filename: join('js', '[name].[hash:4].js')   // 這裡可以再往下分目錄
        , clean: true
    }
    , module: { // 放loader的
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins: [
        new CopyPlugin({ // 很雷 10版本以上會報錯， 要降回9
            patterns: [
                {
                    from: join(srcPath, 'css')
                    , to: 'css'
                },
                {
                    from: join(srcPath, 'images')
                    , to: 'images'
                }
            ],
        })
    ].concat(htmlWebpackPluginItems)
}


/*
從 c:\ 執行node 也輸出固定的結果  
C:\>node C:\Users\USER\Desktop\TC_Node_Pratice\00000000-webpack\webpack.config.js
C:\Users\USER\Desktop\TC_Node_Pratice\00000000-webpack
*/