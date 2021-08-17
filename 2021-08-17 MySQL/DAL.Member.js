let { pool, executeSQL } = require('./mySQLConfig');


// 輸入id，返回topid
async function LookTopID(id) {

    try {
        let sql = `SELECT TopID from Member Where ID = ${id} ;`;
        let r = await executeSQL(sql);
        if (r.length === 1) {
            let topID = r[0].TopID
            return topID
        } else {
            throw new Error('no this ID');
        }
    } catch (err) {
        console.log(err);
    }
}


// 一直找上級id， 直到遇0停止
async function updateIDPath(id) {

    let allTopID = [id];
    let topID = await LookTopID(id);
    allTopID.push(topID);
    while (topID !== 0) {
        topID = await LookTopID(topID);
        allTopID.push(topID);
    }

    let idPath = allTopID.reverse().join(',');
    let sql = `UPDATE Member SET Path = '${idPath}' Where ID = ${id} ;`;
    let r = await executeSQL(sql);
}

(async () => {

    let sql = `SELECT ID FROM Member`;
    try {
        let r = await executeSQL(sql);
        let allID = r.map(x => x.ID);
        for (const id of allID) {
            await updateIDPath(id);
        }
    }
    catch (err) {
        console.log(err);
    }
    pool.end()
})()