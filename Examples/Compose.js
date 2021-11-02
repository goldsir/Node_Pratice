function func1(next) {
    console.log(1)
    next()
    console.log(2)
}
function func2(next) {
    console.log(3)
    next()
    console.log(4)
}
function func3(next) {
    console.log(5)
    next()
    console.log(6)
}
const arr = [func1, func2, func3];

const composeSync1 = function () {
    function dispatch(index) {
        if (index === arr.length) return;
        return arr[index](() => dispatch(index + 1))
    }
    return dispatch(0)
}

// func1(func2(func3(() => { })))
const composeSync2 = function () {
    let prev = () => { }
    for (let i = arr.length - 1; i >= 0; i--) {
        prev = arr[i].bind(this, prev)
    }
    return prev()
}

//composeSync1()
composeSync2()