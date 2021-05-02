// 太神了，這個代碼真的強

function compose(middlewares) {
    return function (ctx) {
        return dispatch(0)
        function dispatch(i) {
            let fn = middlewares[i] // 注：application.js 裡面用來存放中介軟體的陣列
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(fn(ctx, function next() {
                return dispatch(i + 1)
            }))
        } x
    }
}

async function fn1(ctx, next) {
    let fn1S = 'fn1 Start';
    await next();
    let fn1E = 'fn1 End';
}

async function fn2(ctx, next) {
    let fn1S = 'fn2 Start';
    await next();
    let fn1E = 'fn2 End';
}

function fn3(ctx, next) {
    let fn3S = 'fn3';
}

const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);

// 注：這裡ctx隨便用個字串代替，正式呼叫的話，ctx是createContent建立的上下文物件，裡面有response,request等等。
finalFn('ctx');