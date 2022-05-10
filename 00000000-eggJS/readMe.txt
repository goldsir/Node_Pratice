
    官方文檔: https://www.eggjs.org/zh-CN/core
    
    建立專案方式
        npm i -g egg-init
        egg-init baoWang --type=simple
        npm i
        npm i egg-mysql --save
        npm update
        npm run dev

    ******整個資料夾的名稱不能有空白******

    
    資料庫編碼
        
        utf8mb4
        utf8mb4_bin
        
        -- SHOW COLLATION LIKE '%utf8mb4%';
        CREATE DATABASE cms CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;


    配置 config/plugin.js
        
        mysql: {
            enable: true
            , package: 'egg-mysql'
        }

    配置 config/config.default.js
        
        const userConfig = {
            mysql: {
                client: {
                    host: 'localhost'
                    , port: 3306
                    , user: 'root'
                    , password: ''
                    , databse: 'cms'
                    , app:true         // this.app.mysql.query('')
                }
            }
        };


        #搞死人，只要有指定環境變量， 開發模式的自動更新就失效， 害我搞很久  
        install cross-env --save-dev
        cross-env EGG_SERVER_ENV=prod && egg-bin dev 
        
        #start會讀取config.prod.js
        egg-scripts start --daemon --title=egg-server-app --port=80
