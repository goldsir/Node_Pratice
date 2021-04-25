function delay(seconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(seconds);
        }, seconds * 1000);
    });
}

function* gen() {
    let a = yield delay(3);
    console.log(a);
    let b = yield delay(2);
    console.log(b);
    let c = yield delay(1);
    console.log(c);
}

function co(it) {

    return new Promise(function (resolve, reject) {

        function next(data) {

            let { value, done } = it.next(data);
            console.log(value, done);

            if (done) {

                resolve(value);

            } else {

                Promise.resolve(value).then((data) => {
                    next(data);
                });
            }
        }

        next();
    });
}

co(gen());

