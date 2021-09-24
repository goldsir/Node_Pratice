function inputValueCheck(req, res, next) {

    // 未傳入對應參數名會得到 undefined

    let account = req.query.account || req.body.account;
    let categoryId = req.query.categoryId || req.body.categoryId;
    let title = req.query.title || req.body.title;
    let content = req.query.content || req.body.content;


    try {

        //有帶參數過來(必然是一個string)，就針對參數檢查

        if (typeof account === 'string' && account.length < 4) {
            throw Error('account 長度要 >= 4');
        }
        else if (typeof categoryId === 'string' && account.length === 0) {
            throw Error('請選擇分類');
        }
        else if (typeof categoryId === 'string' && account.length > 0) {

            if (/^\d+$/.test(categoryId) === false) {
                throw Error('分類id錯誤');
            }
        }
        else if (typeof title === 'string' && title.length === 0) {
            throw Error('請輸入標題');
        }
        else if (typeof content === 'string' && content.length === 0) {
            throw Error('請輸入內容');
        }



        next();
    } catch (err) {
        res.json(resultMessage(1, err.message));
    }

};

module.exports = {
    inputValueCheck
}