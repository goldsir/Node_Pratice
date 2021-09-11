const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    mode: 'development' // production | development

    , entry: {
        login: path.join(__dirname, 'src/js/login.js')
    },
    output: {
        path: path.join(__dirname, 'web/js')
        , filename: '[name].[hash:8].js',
    }
    , plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/login.html'),
            filename: path.join(__dirname, 'web/login.html'),
            chunks: ['login']
        })
        , new CleanWebpackPlugin()
    ]
}