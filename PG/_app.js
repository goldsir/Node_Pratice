// ctrl+` -> cmd -> npm init -y

const moment = require('moment');           // npm install moment --save
const nodeFetch = require('node-fetch')     // npm install node-fetch --save

const operator_token = '03eae309df05860da4dc655c7586d2c9';
const secret_key = 'e299c1343a4109d4813afa64f074ee3e';
const apiDomain = 'https://api.pg-bo.me/external-datagrabber';  // DataGrabAPIDomain
const api = 'Bet/v4/GetHistoryForSpecificTimeRange';
const timeFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

let postBody = {
    operator_token: operator_token
    , secret_key: secret_key
    , count: 5000
    , bet_type: 1
    , from_time: 0
    , to_time: 0
};

postBody.from_time = moment('2021-04-05 00:00:00', timeFormat).unix() * 1000;
postBody.to_time = moment('2021-04-06 23:59:59', timeFormat).unix() * 1000;

let postBodyString = '';
for (let key in postBody) {
    postBodyString += `${key}=${postBody[key]}&`
}
console.log(postBodyString);

let fetchOptions = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    , method: 'post'
    , body: postBodyString
}

nodeFetch(`${apiDomain}/${api}`, fetchOptions)
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json));


//console.log(moment.unix(1612483200).format(timeFormat));