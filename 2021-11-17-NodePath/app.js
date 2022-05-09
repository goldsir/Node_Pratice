const { executeSQL, escape } = require('./mySQLConfig');

async function getParentIdById(id) {  // 輸入一個id， 返回它pid

    let sql = `SELECT ParentsId FROM article WHERE id = ${id};`;
    let result = await executeSQL(sql);
    return result;

}

async function updateNodePath(id, nodePath) {

    nodePath = escape(nodePath);
    let sql = `update article set nodePath = ${nodePath} WHERE id = ${id};`;
    let result = await executeSQL(sql);
    return result;
}



async function getNodePath(id) {  // 輸入id， 找出該id的全部資料節點

    let nodePath = [];  // 存放pid用的
    nodePath.push(id);

    // 找22的pid
    let result = await getParentIdById(id);

    if (result.length === 0) {
        return nodePath;
    }

    ParentsId = result[0].ParentsId;

    while (ParentsId !== 0) {

        nodePath.unshift(ParentsId)
        result = await getParentIdById(ParentsId);
        ParentsId = result[0].ParentsId;
    }


    console.log(nodePath.join(','));
    await updateNodePath(id, nodePath.join(','));

}

let allId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];

(async function () {


    allId.forEach(async (id) => {
        await getNodePath(id);
    })


})();