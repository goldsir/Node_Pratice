function fn(p1, ...others) {

    console.log(Object.prototype.toString.call(others));
    console.log(others);

}

fn(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);