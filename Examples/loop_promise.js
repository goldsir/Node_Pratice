function delay(s) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date());
        }, s * 1000);
    });
}

(async () => {
    for (let i = 1; i <= 3; i++) {
        let r = await delay(i);
        console.log(r);
    }
})();



