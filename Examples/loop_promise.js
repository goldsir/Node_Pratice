function delay(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(s);
            resolve(s);
        }, s * 1000);
    });
}

async function start() {

    await delay(1);
    await delay(2);
    await delay(3);
}

/*

for (let i = 1; i <= 3; i++) {
    start();
    console.log(`${i}------------------`);
}*/

(async function () {

    for (let i = 1; i <= 3; i++) {
        await start();
        console.log(`${i}------------------`);
    }
})()
