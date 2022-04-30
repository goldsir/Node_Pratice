npm install --save less less-loader

vue create app => Vue2 預設選項

    vue.config.js

        const { defineConfig } = require('@vue/cli-service')
        module.exports = defineConfig({
            transpileDependencies: true
            , lintOnSave: false  // <= 討厭鬼
        })

    jsconfig.json
        
        {
            "compilerOptions": {
                "target": "es5",
                "module": "esnext",
                "baseUrl": "./",
                "moduleResolution": "node",
                "paths": {
                    "@/*": [
                        "src/*"
                    ]
                },
                "lib": [
                    "esnext",
                    "dom",
                    "dom.iterable",
                    "scripthost"
                ]
            },
            "exclude": [
                "node_modules",
                "dist"
            ]
        }