const moment = require('moment');
const nodeFetch = require('node-fetch');
const fs = require('fs');

function readJSON(path) {

    var promise = new Promise(function (resolve, reject) {
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => { //得到的data會是字串

            if (err) {
                return reject(err);
            }
            try {
                let json = JSON.parse(data); //JSON.parse(str) 將字串回傳承json格式
                resolve(json);
            }
            catch (err) {
                reject(err);
            }

        });
    });
    return promise;
};

async function createPOSTBodyString(from_time, to_time) {

    let config = await readJSON('./pgAPIConfig.json');

    let postBody = {
        operator_token: config.operator_token
        , secret_key: config.secret_key
        , count: 1500
        , bet_type: 1
        , from_time: 0
        , to_time: 0
    };

    postBody.from_time = moment(from_time, config.timeFormat).unix() * 1000; //moment可以將時間轉為unix時間
    postBody.to_time = moment(to_time, config.timeFormat).unix() * 1000;

    let postBodyString = '';

    for (let key in postBody) {
        postBodyString += `${key}=${postBody[key]}&`;
    }

    return postBodyString;
};

async function getAPIData(from_time, to_time) {

    let postBodyJSON = await readJSON('./pgAPIConfig.json');
    let postBodyString = await createPOSTBodyString(from_time, to_time);

    let fetchOptions = {
        headers: { 'content-Type': 'application/x-www-form-urlencoded' }
        , method: 'post'
        , body: postBodyString
    };

    try {
        let response = await nodeFetch(`${postBodyJSON.apiDomain}/${postBodyJSON.api}`, fetchOptions);
        let jsonData = await response.json();
        console.log('jsonData 是一個: 【' + typeof jsonData + '】');
        return jsonData;
    }
    catch (err) {
        reject(err);
    }
}

//getAPIData('2021-04-05 00:00:00', '2021-04-05 23:59:59')
module.exports = getAPIData;