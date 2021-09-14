function aRejectedPromise() {

    return new Promise((resolve, reject) => {
        reject('(σ′▽‵)′▽‵)σ 哈哈哈哈～你看看你');
    });

}

async function start() {

    let r = await aRejectedPromise().catch(((err) => { console.log(err); }));
    console.log(r);
};

start()