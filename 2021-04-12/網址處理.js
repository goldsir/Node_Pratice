let url = require('url');  // 內建module
let requestURL = `http://127.0.0.1:3000/PGAPI.html?start=2021-04-12 00:00:00&end=2021-04-12 23:59:59&jess=哭鼻子`;

let urlParseFalse = url.parse(requestURL, false);
let urlParseTrue = url.parse(requestURL, true);

console.log(urlParseFalse);
console.log('\n');
console.log('----------------------------------愛哭的分隔線----------------------------------');
console.log('\n');
console.log(urlParseTrue);

/*

    請求網址裡面有包含 請求路徑(pathname)跟 請求參數(query) 兩個部分
    http://127.0.0.1:3000/PGAPI.html?start=2021-04-12 00:00:00&end=2021-04-12 23:59:59&jess=哭鼻子
    http://127.0.0.1:3000/PGAPI.html?start=2021-04-13 00:00:00&end=2021-04-13 23:59:59&jess=哭鼻子
    http://127.0.0.1:3000/PGAPI.html?start=2021-04-14 00:00:00&end=2021-04-14 23:59:59&jess=哭鼻子

	路由: 當一個請求來臨時，我們可以依據它的請求方式和請求路徑來決定服務器是否給予響應以及怎麼響應。

    server.js要針完整的請求網址做回應，if-else 會寫不完， 所以用 請求路徑pathname 做匹配。
        url.parse(requestURL).pathname;  // '/PGAPI.html'

    請求參數:
        url.parse(requestURL, false).query; `false` 會解析出一個`字串`
            query: 'start=2021-04-12%2000:00:00&end=2021-04-12%2023:59:59&jess=哭鼻子'

        url.parse(requestURL, true).query; `true` 會把解析出來字串進一步轉換成一個`物件`，方便寫程式。
        【* 具有特定格式的字串要轉成物件， 如何實現?】

        query: {
            start: '2021-04-12 00:00:00',
            end: '2021-04-12 23:59:59',
            jess: '哭鼻子'
        }

    懶人包: 最常用的就是
        let pathname = url.parse(requestURL, true).pathname ;
        let query = url.parse(requestURL, true).query ;

        速寫形式: let {pathname, query} = url.parse(requestURL, true) ;
*/