
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

        console.log(acc.toString())

        return function (x) {
            return acc(cur(x));
        }
    });
}

let com = compose(fn1, fn2, fn3);
com(1)
