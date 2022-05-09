function inputTest(req, res, next) {

    console.log('攔截1----------------------');

    let Id = req.query.Id || req.body.Id;  // 請求參數的來2個來源 req.query、req.body
    let UserAccount = req.query.UserAccount || req.body.UserAccount;
    // 你有傳值進來， 我要檢查值是否正確
    console.log(Id);

    try {
        if (typeof Id === 'string' && Id.length > 0) {

            let tryParseId = parseInt(Id);
            if (isNaN(tryParseId)) {
                throw Error('Id須為數字');
            }
        }

        if (typeof UserAccount === 'string' && UserAccount.length < 4) {
            throw Error('UserAccount 長度要大於4');
        }
        next();
    } catch (err) {
        res.json(resultMessage(1, err.message));
    }

}

module.exports = inputTest;