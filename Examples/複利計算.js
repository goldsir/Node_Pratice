let init = 0;
let into = 12000;
let sum = 0;
let years = 20;
let months = years * 12;
let profitRate = 5;


for (let i = 1; i <= months; i++) {
    sum += into;
    if (i % 12 === 0) {

        let profit = sum * profitRate / 100;
        sum += profit;

        console.log(i, sum);
    }
}