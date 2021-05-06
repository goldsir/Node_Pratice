function inputCheck(req, res, next) {

    let Id = req.query.Id || req.body.Id;
    let UserAccount = req.query.UserAccount || req.body.UserAccount;

    try {
        if (typeof Id === 'string' && Id.length > 0) {

            let tryParseId = parseInt(Id);
            if (isNaN(tryParseId)) {
                throw Error('Id須為數字');
            }
        }

        next();

    } catch (err) {
        res.json(resultMessage(1, err.message));
    }
}

module.exports = inputCheck;