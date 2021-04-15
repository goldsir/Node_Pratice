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

// postBody.operator_token = postBody["operator_token"]
let postBodyString = '';
for (let key in postBody) {

    console.log(key);
    postBodyString += `${key}=${postBody[key]}&`
}

console.log(postBodyString);
/*

operator_token=03eae309df05860da4dc655c7586d2c9
&secret_key=e299c1343a4109d4813afa64f074ee3e
&count=5000&bet_type=1
&from_time=0&to_time=0
&
*/