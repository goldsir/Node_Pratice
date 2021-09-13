const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    mode: 'development' // production | development

    , entry: {
        common: path.join(__dirname, 'src/js/common.js')
        , login: path.join(__dirname, 'src/js/login.js')
    },
    output: {
        path: path.join(__dirname, 'web/js')
        , filename: '[name].[hash:8].js',
    }
    , plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/login.html'),
            chunks: ['common', 'login'],
            filename: path.join(__dirname, 'web/login.html')

        })
        , new CleanWebpackPlugin()
    ]
    , module: {
        rules: [
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
        ]
    }
}