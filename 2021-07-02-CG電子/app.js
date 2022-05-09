const config = require('./cgConfig');
const aes256Cryto = require("./aes256Encryption"); // npm install crypto-js --save
const fetch = require('node-fetch')

let dataObject = {
    "startTime": "2021-07-01T00:00:00.000+08:00",
    "endTime": "2021-07-02T23:59:59.000+08:00",
    "method": "data"
}

/*
    物件要轉成字串才能做加密/解密動作
    而且字串才能做為http請求參數的值
*/
let dataString = JSON.stringify(dataObject);

//參數加密後的字串，拿去餵API
const dataStringEncrypted = aes256Cryto.Encrypt(dataString, config.Key, config.IV);



// fetch ->then 形式 請改寫成 async-await 形式
fetch(
    config.apiURL
    , {
        method: 'POST'
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        , body: `channelId=${config.ChannelID}&data=${dataStringEncrypted}`    // 格式: key1=value1&key2=value2
    }
)
    .then(res => res.text()) // 它不是返回json， 是返回一個加密過的文本，所以用text()， 待會兒要解密
    .then((text) => {

        //這個text是加密的內容， 要解密
        let afterDecrypted = aes256Cryto.Decrypt(text, config.Key, config.IV);
        console.log(typeof afterDecrypted, afterDecrypted,); // 解密後的字串
        let datas = JSON.parse(afterDecrypted);  // 解密後的字串，再轉成物件使用
        console.log(typeof datas, datas);
    });


/*
       application/x-www-form-urlencoded 格式: key1=value1&key2=value2             ˊ_ˋ
       這個格式是固定的， 為什麼你不記得了                                          ˊ_ˋ
       不開心 不開心 不開心 不開心                                             ˊ_ˋ
*/