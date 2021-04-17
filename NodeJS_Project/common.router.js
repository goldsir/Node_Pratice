const common = require("./common");

// 檢查登入狀態，各路由都會用到
async function checkLogin(req, res, next) {

    try {
        let tokenHeaderName = 'jwt'
        let data = await common.jwtVerify(req.get(tokenHeaderName));

        if (data.ip !== req.ip) { //簽出去的token載體，要包含ip，不然會gg
            let msg = {
                resultCode: -1,
                resultMessage: "IP變動，請重新登入",
            };
        }
        else {
            req.userData = data;
        }
        next();
    }
    catch (err) {

        let msg = {
            resultCode: -1,
            resultMessage: "請重新登入。",
        };

        res.json(msg);
    }
}

module.exports = {
    checkLogin
}

/*
    登入成功後存下token: sessionStorage.setItem('jwt', token);

    fetch(url
        , {
            headers: {
                'content-type': 'application/json'
                , 'jwt': sessionStorage.getItem('jwt')
            }
            , body: JSON.stringify(data)
        }
    );
*/
