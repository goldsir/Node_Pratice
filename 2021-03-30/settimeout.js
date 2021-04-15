function fn(callback) {

    setTimeout(() => {

        let x = 1000;
        callback(x);


    }, 1000);
}


fn(function (x) { //沒有名稱的函式
    console.log(x);
});
