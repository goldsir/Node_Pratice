// 不使用第三個變數， 將a、b 兩個變數的值交換

let a = 10;
let b = 100;

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b)

console.log(10 ^ 10);