const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    mode: 'development' // production | development

    , entry: {
        common: path.join(__dirname, 'src/js/common.js')
        , member_register: path.join(__dirname, 'src/js/member_register.js')
        , login: path.join(__dirname, 'src/js/login.js')

    },
    output: {
        path: path.join(__dirname, 'web')
        , filename: 'js/[name].[hash:8].js',
    }
    , plugins: [

        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/login.html'),
            chunks: ['common', 'login'],
            filename: path.join(__dirname, 'web/login.html')

        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/member_register.html'),
            chunks: ['common', 'member_register'],
            filename: path.join(__dirname, 'web/member_register.html')

        })
        , new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:3].css'
        })
        , new CleanWebpackPlugin()
    ]
    , module: {
        rules: [
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
        ]
    }
}