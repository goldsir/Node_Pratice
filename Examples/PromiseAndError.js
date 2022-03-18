function getPromise(flag) {

    return new Promise((resolve, reject) => {

        throw new Error('(✧≖‿≖)')

        if (flag) {
            resolve(flag);
        }
        else {
            reject(flag)
        }
    }).catch(err => console.log('errrrrr', err));
}

async function fn() {


    try {
        let p = await getPromise(false);
        console.log(p);
    }
    catch (err) {
        console.log('errrrrr', err)
    }

}
fn()