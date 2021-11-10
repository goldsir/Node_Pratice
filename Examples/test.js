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

function compose(f, g) {
    return function (x) {
        return f(g(x));
    };
};

var toUpperCase = function (x) {
    return x.toUpperCase();
};
var exclaim = function (x) {
    return x + '!';
};

var shout = compose(exclaim, toUpperCase);
console.log(shout('rrrrrrrrrrr'));