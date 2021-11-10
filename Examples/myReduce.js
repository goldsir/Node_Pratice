Array.prototype.myReduce = function (cb, initialValue) {

    const array = this;
    let acc = initialValue || array[0];
    const startIndex = initialValue ? 0 : 1

    for (let i = startIndex; i < array.length; i++) {

        const cur = array[i]
        acc = cb(acc, cur, i, array)
    }
    return acc;
}

let sum = [1, 2, 3].myReduce(function (acc, cur) {
    return acc + cur
}, 10);

console.log(sum);