let str = '200566526042631026';
let num = new Number(str);
console.log(str + '\n' + num);  // str表示的數值過大， 超過number的最大範圍, 轉型失敗

console.log('---------------------');

let bigNum = BigInt(str);
console.log(str + '\n' + bigNum);
