let str = '37,41,43,44,45';

let m = str.match(/,/g);  // g= global 全部
let m2 = str.match(/,/);  // 沒加g

// 有g跟沒g 結果不一樣
console.log(m);
console.log(m2);


