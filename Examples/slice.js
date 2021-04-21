let slice = Array.prototype.slice;

function fn() {

    let result = slice.call(arguments, 0);

    console.log(result);


}

fn(1, 2, 3, 4, 5)