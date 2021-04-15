const fetch = require("node-fetch");



async function fetchAPI(url) {

    let response = await fetch(url);
    let jsonData = await response.json();
    console.log(jsonData);
}

fetchAPI('http://localhost:3000/api');