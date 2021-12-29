
function fn1(i) {
    console.log(i);
    return i + 1;
}
function fn2(i) {
    console.log(i);
    return i + 2;
}
function fn3(i) {
    console.log(i);
    return i + 3;
}

function compose(...fns) {

    return fns.reduce((acc, cur) => {

        return function (x) {
            return acc(cur(x));
        }

    });
}

let com = compose(fn1, fn2, fn3);
let end = com(1);

console.log(end);
