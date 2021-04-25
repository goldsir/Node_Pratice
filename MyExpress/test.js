function fn(p1, ...others) {

    console.log(Object.prototype.toString.call(others));
    console.log(others);
}

fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);



let array = [];
for (let i = 1; i <= 100; i++) {
    array.push(i);
}

let _array = array.splice(0, 10);
console.log(_array);
console.log(array);