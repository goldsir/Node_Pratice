const { getPagination } = require('../common');
const dal = require('./user.dal')


async function getUserList(pageIndex, pageSize) {

    let result = await dal.getUserList(pageIndex, pageSize);
    // getPagination(totalRows, pageSize, currentPage, listSize)
    let pageInfo = getPagination(result.totalRows, pageSize, pageIndex, 10);

    return {
        datas: result.datas
        , pageInfo
    }
}


module.exports = {
    getUserList


}