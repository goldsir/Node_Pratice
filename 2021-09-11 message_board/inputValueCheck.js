function inputValueCheck(req, res, next) {

    let account = req.query.account || req.body.account;

    try {
        if (typeof account === 'string' && account.length < 4) {
            throw Error('account 長度要 >= 4');
        }
        next();
    } catch (err) {
        res.json(resultMessage(1, err.message));
    }

};

module.exports = {
    inputValueCheck
}