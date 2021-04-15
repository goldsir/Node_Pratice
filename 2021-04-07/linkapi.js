const moment = require('moment');
const nodeFetch = require('node-fetch');

const operator_token = '03eae309df05860da4dc655c7586d2c9';
const secret_key = 'e299c1343a4109d4813afa64f074ee3e';
const apiDomain = 'https://api.pg-bo.me/external-datagrabber';
const api = 'Bet/v4/GetHistoryForSpecificTimeRange';
const timeFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

let postBody = {
    operator_token: operator_token
    , secret_key: secret_key
    , count: 1500
    , bet_type: 1
    , from_time: 0
    , to_time: 0
};

postBody.from_time = moment('2021-03-25 00:00:00',timeFormat).unix() * 1000; //moment可以將時間轉為unix時間
postBody.to_time = moment('2021-03-25 23:59:59',timeFormat).unix() * 1000;

// postBody.operator_token = postBody['operator_token']
 let postBodyString = '';

for(let key in postBody){
    postBodyString += `${key}=${postBody[key]}&` 
}

console.log(postBodyString);

/*
operator_token=03eae309df05860da4dc655c7586d2c9
&secret_key=e299c1343a4109d4813afa64f074ee3e
&count=1500&bet_type=1
&from_time=1617667845000
&to_time=1617667845000&
*/

let fetchOptions = {
    headers: {'content-Type':'application/x-www-form-urlencoded'}
    , method: 'post'
    , body: postBodyString
}

nodeFetch(`${apiDomain}/${api}`, fetchOptions)
    .then(res => res.json())
    .then(json => console.log(json));