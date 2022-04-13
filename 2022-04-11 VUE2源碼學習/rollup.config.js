// npm install @babel/preset-env @babel/core rollup rollup-plugin-babel rollup-plugin-serve cross-env -D

import babel from 'rollup-plugin-babel';

export default {

    input: 'src/index.js'
    , output: {
        file: './dist/vue.js'
        , format: 'umd'
        , name: 'Vue'
        , sourcemap: true
    },
    plugins: [

        babel({
            exclude: "./node_modules/**"
        })]
}

