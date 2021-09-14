function aRejectedPromise() {

    return new Promise((resolve, reject) => {
        reject('(σ′▽‵)′▽‵)σ 哈哈哈哈～你看看你');
    });

}

async function start() {

    let r = await aRejectedPromise().catch(((err) => { console.log(err); }));
    console.log(r);
};

//start();



async function fn() {

    try {
        throw new Error('Fuck');
    }
    catch (err) {
        console.log('---------', err);
        return err
    }
}

async function doFn() {
    let r = await fn();
    console.log(r);
}

doFn();