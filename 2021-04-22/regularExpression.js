

//  https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions

let reg = /ab/;   // object
console.log(typeof reg);

console.log(reg.test('a'));
console.log(reg.test('abc'));