function core() {
    console.log('core');
}

Function.prototype.before = function (cb) {

    return () => {
        cb()
        this();
    }
}

let newCore = core.before((cb) => {

    console.log('before');

});

newCore()