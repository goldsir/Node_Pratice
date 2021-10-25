const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    mode: 'development' // production | development

    , entry: {
        common: path.join(__dirname, 'src/js/common.js')
        , member_register: path.join(__dirname, 'src/js/member_register.js')
        , member_login: path.join(__dirname, 'src/js/member_login.js')
        , member_info: path.join(__dirname, 'src/js/member_info.js')
        , article_add: path.join(__dirname, 'src/js/article_add.js')
        , article_list: path.join(__dirname, 'src/js/article_list.js')
        , article: path.join(__dirname, 'src/js/article.js')
        , reply: path.join(__dirname, 'src/js/reply.js')


    },
    output: {
        path: path.join(__dirname, 'web')     // 只能到web這一級，下面css路徑要跟這裡配對
        , filename: 'js/[name].[hash:4].js'
        , clean: true
    }
    , plugins: [

        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:4].css'
        }),

        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/member_login.html'),
            chunks: ['common', 'member_login'],
            filename: path.join(__dirname, 'web/member_login.html')

        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/member_register.html'),
            chunks: ['common', 'member_register'],
            filename: path.join(__dirname, 'web/member_register.html')

        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/member_info.html'),
            chunks: ['common', 'member_info'],
            filename: path.join(__dirname, 'web/member_info.html')

        })
        ,
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/article_add.html'),
            chunks: ['common', 'article_add'],
            filename: path.join(__dirname, 'web/article_add.html')

        })
        ,
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/article_list.html'),
            chunks: ['common', 'article_list'],
            filename: path.join(__dirname, 'web/article_list.html')

        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/article.html'),
            chunks: ['common', 'article'],
            filename: path.join(__dirname, 'web/article.html')
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/reply.html'),
            chunks: ['common', 'reply'],
            filename: path.join(__dirname, 'web/reply.html')
        })


    ]
    , module: {
        rules: [
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
        ]
    }
}