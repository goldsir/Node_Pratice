const https = require('https');


const req = https.get('https://developer.mozilla.org/zh-TW/docs/Web/JavaScript', res => {


    //    console.log(`狀態碼: ${res.statusCode}`)

    let buffArray = [];

    res.on('data', function (chunk) {

        buffArray.push(chunk)
    });

    res.on('end', function () {
        let htmlStr = Buffer.concat(buffArray).toString('utf8');
        crawler(htmlStr)
    });
});

function crawler(htmlStr = "") {


    //console.log(htmlStr);

    let reg = /<a[\s\S]*?href="([^"]*?)"[^>]*>(?:<[^>]+?>)*([^<]+)(?:<\/[^>]+?>)*<\/a>/g;

    let matches = htmlStr.matchAll(reg);

    for (let m of matches) {
        console.log(`${m[2].trim()} ===>  ${m[1]}`);
    }
}



req.end()


/*
    let allA = [...document.querySelectorAll('a')]
    allA.forEach((item)=> console.log(item.textContent,item.href))


    [...document.querySelectorAll('a[href^=http]')].map(item => `${item.textContent}=${item.href}`).join('\n\n')
*/