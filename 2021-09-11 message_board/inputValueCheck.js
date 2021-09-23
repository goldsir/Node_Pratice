function inputValueCheck(req, res, next) {

    let account = req.query.account || req.body.account;

    try {

        //有帶參數過來，就針對參數檢查

        if (typeof account === 'string' && account.length < 4) {
            throw Error('account 長度要 >= 4');
        }
        else if (typeof content === 'string' && account.length === 0) {
            throw Error('請輸入內容');
        }
        else if (typeof categoryId === 'string' && account.length === 0) {
            throw Error('請選擇分類');
        }
        else if (typeof categoryId === 'string' && account.length === 0) {
            throw Error('分類id錯誤');  //  還沒寫完
        }

        next();
    } catch (err) {
        res.json(resultMessage(1, err.message));
    }

};

module.exports = {
    inputValueCheck
}