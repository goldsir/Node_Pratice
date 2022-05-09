const str = '9kFZTQLbUWOjurz9IKRdeg28rYxULHWDUrIHxCY6tnHleoJ';
console.log(Array.from(str));

let obj = {};
Array.from(str).reduce((accumulator, current) => {

    current in accumulator ? accumulator[current]++ : accumulator[current] = 1;
    return accumulator;
}, obj);

console.log(obj);  // 算出每字母出現的次數


// 求最大值, 最小值
let arr = [100, 1, 2, 3, 4, 5, -1];
let min = arr.reduce((pre, cur) => Math.min(pre, cur));
let max = arr.reduce((pre, cur) => Math.max(pre, cur));
console.log(min, max);


// 去重複
arr = [1, 2, 3, 1, 1, 2, 3, 3, 4, 3, 4, 5]

let result = arr.reduce((prev, item, index, arr) => {
    !prev.includes(item) && prev.push(item);
    return prev
}, [])
console.log(result);  //[1, 2, 3, 4, 5]


array = [1, 2, 3, 4, 5];
array.reduce((acu, cur, curIndex, src) => {

    console.log(acu, cur, curIndex);

});
console.log('-------------------------------');
array.reduce((acu, cur, curIndex, src) => {

    console.log(acu, cur, curIndex);

}, 0)