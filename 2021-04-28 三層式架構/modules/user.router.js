const express = require("express");
const { resultMessage } = require('../common');
const bll = require('./user.bll.js');
const router = express.Router();				// 路由管理

router.get('/list', async (req, res) => {

    let { pageIndex, pageSize } = req.query;
    console.log(pageIndex, pageSize);

    // 處理請求參數 => 轉換成適當型別、驗證有效性
    pageIndex = parseInt(pageIndex);
    pageSize = parseInt(pageSize);
    let userList = await bll.getUserList(pageIndex, pageSize);
    res.json(userList);

});

router.get('/add', async (req, res) => {

    res.json(resultMessage(0, 'userAdd'));
});

router.get('/update', async (req, res) => {

    res.json(resultMessage(0, 'userUpdate'));

});

module.exports = router;