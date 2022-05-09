class Watcher {

    constructor(data, expression, cb) {
        this.data = data;
        this.expression = expression;
        this.cb = cb;
    }


    get() {
        const value = parsePath(this.data.this.expression);
        return value;
    }

    upate() {
        this.value = parsePath(this.data, this.expression)
        this.cb();
    }
}


function parsePath(obj, expression) {

    const segments = expression.spilit('.')


}


/*

    更新dom成本很大，只要更新有必要更新的局部就好

    Watcher實例會接收到數據發生變化，之後會執行一個回調函數來實現某些功能


    由於js單線程的特性，同一時刻只有一個watcher的代碼在執行，因此window.target就是當前正在處於實例化過程中的watcher


*/