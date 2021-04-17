function getPagination(currentPage, pageSize, totalRows, listSize = 10) {
    let startPage = 0;
    let endPage = 0;
    let totalPages = 0; //總頁數

    //計算總頁數
    if (totalRows === 0) {
        totalPages = 1;
    } else if (totalRows % pageSize == 0) {
        totalPages = totalRows / pageSize;
    } else {
        /*取地板值*/
        totalPages = Math.floor(totalRows / pageSize) + 1;
    }

    //防呆: 當前頁次超出總頁數
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    if (totalPages <= listSize) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = currentPage - (listSize / 2) - 1;
        endPage = currentPage + (listSize / 2);

        if (startPage < 1) {
            startPage = 1;
            endPage = listSize;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - (listSize - 1);
        }
    }

    let prePage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let nextPage = currentPage + 1 > totalPages ? totalPages : currentPage + 1;

    return {
        startPage
        , endPage
        , prePage
        , nextPage

    };
}

console.log(getPagination(1, 10, 103, 10));
console.log(getPagination(2, 10, 103, 10));
console.log(getPagination(3, 10, 103, 10));
console.log(getPagination(4, 10, 103, 10));
console.log(getPagination(5, 10, 103, 10));
console.log(getPagination(6, 10, 103, 10));
console.log(getPagination(7, 10, 103, 10));
console.log(getPagination(8, 10, 103, 10));
console.log(getPagination(9, 10, 103, 10));
console.log(getPagination(10, 10, 103, 10));
console.log(getPagination(11, 10, 103, 10));
console.log(getPagination(12, 10, 103, 10));