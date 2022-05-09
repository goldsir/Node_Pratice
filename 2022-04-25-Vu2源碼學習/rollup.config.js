import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {

    input: './src/index.js'
    , output: {
        format: 'umd'               // 模塊化的類型
        , name: 'Vue'               // window上的全局變量名稱
        , file: './dist/umd/vue.js'
        , sourcemap: true
    },
    plugins: [
        babel({ exclude: 'node_modules/**' })
        , serve({
            open: false
            , port: 3000
            , contentBase: ''
            , openPage: '/index.html'
        })
    ]
}