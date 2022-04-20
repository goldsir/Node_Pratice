let start = 2500000;
let add = 144000;   // input per years
let sumArray = [];
let rate = 1.08;
let years = 10;
for (let i = 0; i < years; i++) {
    sumArray[i] = add * Math.pow(rate, i + 1)
}

let sum = sumArray.reduce((pre, cur) => {
    return pre + cur
});


console.log(start * Math.pow(rate, years) + sum);