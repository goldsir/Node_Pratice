// 專門處理帳號登入驗證
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const crypto = require('crypto');
const { getConfig, resultMessage } = require('../common');


// 生成token私鑰
function _tokenPrivateKey() {
    let tokenPrivateKey = crypto.randomBytes(64).toString('hex');
    console.log(tokenPrivateKey);
}

function jwtSign(data) {

    return new Promise((resolve, reject) => {

        let { tokenPrivateKey } = getConfig();
        jwt.sign(
            data
            , tokenPrivateKey
            , {
                algorithm: 'HS256'
                , expiresIn: 60 * 60   // 【seconds】 這裡 60 * 60 = 1h
            }
            , function (err, token) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            }
        );
    });
}

function jwtVerify(token) {

    let { tokenPrivateKey } = getConfig();

    return new Promise((resolve, reject) => {

        jwt.verify(token, tokenPrivateKey, function (err, decoded) {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });

    });
}


// 調用API前先檢查登入狀態 (中間件)
async function checkLoginForAPI(req, res, next) {
    try {

        let _token = req.header('token') || '';
        let data = await jwtVerify(_token);

        if (data.ip !== req.ip) { //簽出去的token載體，要包含ip，不然會gg								
            res.json(resultMessage(-1, 'IP變動，請重新登入'));
        }
        else {
            req.userData = data;
            next();
        }
    }
    catch (err) {
        //log('checkLoginFail.txt', err.stack);
        res.json(resultMessage(-1, '請重新登入'));
    }
}




module.exports = {

    jwtSign
    , jwtVerify
    , checkLoginForAPI
}