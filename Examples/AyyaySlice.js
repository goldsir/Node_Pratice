/*
陣列的 slice() 會回傳一個指定索引範圍的新陣列（不改變原陣列）。

    arr.slice([begin[, end]])
        begin：起始索引，若省略預設為 0；
        end：停止索引（***不包含自己），若省略預設為 arr.length；
        可以使用負數索引，從末項開始倒數。
*/

let datas = [];
for (let i = 1; i <= 105; i++) {
    datas.push(i);
}

let pageIndex = 10;
let pageSize = 10;
let startIndex = (pageIndex - 1) * pageSize;  // 陣列是 0 Base
let endIndex = pageIndex * pageSize;

if (pageIndex < 0) {
    pageIndex = 0;
}

if (endIndex > datas.length) {
    endIndex = datas.length
}

let targets = datas.slice(startIndex, 105);  // 0-9
console.log(targets);
