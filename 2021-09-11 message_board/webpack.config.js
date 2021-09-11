const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    mode: 'development'

    , entry: {
        login: path.join(__dirname, 'src/js/login.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.join(__dirname, 'web/js')
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

