/*
    npm install --save webpack webpack-cli
    npm install --save html-webpack-plugin
    npm install --save clean-webpack-plugin
   
*/

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { Chunk } = require("webpack");
module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "public", 'js', "main.js"),
        header: path.resolve(__dirname, "public", 'js', "header.js"),
        foot: path.resolve(__dirname, "public", 'js', "foot.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash:8].bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
            , chunks: ['main']
        })
        , new CleanWebpackPlugin()
    ]
};
