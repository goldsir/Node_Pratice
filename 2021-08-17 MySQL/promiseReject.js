function test(val) {

    return new Promise((resolve, reject) => {

        if (val === 0) {
            resolve(val);
        }
        else {
            reject('fuck'); // 在async函式中要用try-catch，在then中要提供onRejected
        }
    });
}

async function go(val) {

    try {
        let p = await test(val);
        console.log(p);
    }
    catch (err) {
        console.log(err);
    }

}


test(1).then((value) => {
    console.log(value);
});

