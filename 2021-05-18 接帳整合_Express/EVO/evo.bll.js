const fetch = require('node-fetch');
const config = require('./evo.config');
const gamehistoryURL = `${config.baseURI}${config.historyAPI}`;

const authorizationToken = Buffer.from(`${config.casinoId}:${config.gameHistoryApiToken}`).toString('base64');
(async function () {


    let fetchOptions = {
        headers: { 'Authorization': `Basic ${authorizationToken}` }
        , method: 'GET'
    };

    try {
        let response = await fetch(`${gamehistoryURL}`);
        let jsonData = await response.text();
        console.log(jsonData);
    }
    catch (err) {
        console.log(err);
    }
})()