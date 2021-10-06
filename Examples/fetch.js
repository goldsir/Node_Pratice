const fetch = require('node-fetch');

(async () => {

    const webPath_api_article_add = 'http://localhost:3000/article/add'

    const params = new URLSearchParams();
    params.append('key1', 'value1&&&&');
    params.append('key2', 'value2&&&&');
    params.append('key3', 'value3&&&&');
    let fetchOptions = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        , method: 'POST'
        , body: params
    };

    try {
        let response = await fetch(webPath_api_article_add, fetchOptions);
        let result = await response.json();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
})()