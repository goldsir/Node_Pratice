// 太神了，這個代碼真的強

function compose(middleware) {
    // 省略部分代码
    return function (context, next) {
        // last called middleware #
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index)
                return Promise.reject(new Error("next() called multiple times"));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    };
}


async function fn1(ctx, next) {
    let fn1S = 'fn1 Start';
    await next();
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