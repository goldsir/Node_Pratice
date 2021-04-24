function fn() {
    return async function asyncFn() {
        return 1;
    }
}

fn()().then(data => console.log(data));