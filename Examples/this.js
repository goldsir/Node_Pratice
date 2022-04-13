let t = new (function fn() {
    setTimeout(() => {
        console.log(t == this);
    }, 0);
})()

// new 返回值， 相當於函式內的 this