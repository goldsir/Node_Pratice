const { log } = require('../common');
const { executeSQL } = require('../mySQLConfig');


async function getCategories() {

    // 「其它」是第1個選項，但永遠把它排在最後顯示

    let sql = `
        SELECT id, category
        FROM
            (
                SELECT id, category
                FROM article_category
                WHERE id > 1
                ORDER BY id ASC
            ) AS t1
        UNION
        SELECT id, category
        FROM article_category
        WHERE id = 1 ;           
    `;

    let result = await executeSQL(sql);
    return result;
}

async function article_add(account, categoryId, title, content) {

    let sql = `
        INSERT INTO articles
        SET
        parentId = 0
        , account = N'${account}'
        , categoryId = ${categoryId}
        , title = N'${title}'
        , content =  N'${content}'
        , createTime = CURRENT_TIMESTAMP ;
    `;

    let result = await executeSQL(sql);
    /*
        {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 6,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0
        }
    
    */
    return result;

}

async function getArticles() {

    let sql = `
       SELECT
            id
            , parentId
            , account
            , categoryId
            , title
            , content
            , createTime
            FROM articles
            ORDER BY id DESC
            ;

    `;

    let result = await executeSQL(sql);

    return result;

}



module.exports = {

    getCategories
    , article_add
    , getArticles
}