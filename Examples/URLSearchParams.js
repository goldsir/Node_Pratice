const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const channelId = '77887788';
const data = '==&&\\';

const params = new URLSearchParams();
params.append('channelId', '77887788');
params.append('data', '==&&\\');

let fetchOptions = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    , method: 'POST'
    //, body: `channelId=${channelId}&data=${data}`
    , body: params
};

(async () => {
    let response = await fetch('http://localhost:8080', fetchOptions);
    let textData = await response.text();
    console.log(textData);

})()