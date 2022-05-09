function compose(middleware) {
    if (!Array.isArray(middleware)) {
        throw new TypeError('Middleware stack must be an array!');
    }

    for (const fn of middleware) {
        if (typeof fn !== 'function') {
            throw new TypeError('Middleware must be composed of functions!')
        }
    }

    return function (context, next) {

        let index = -1;
        return dispatch(0);

        function dispatch(i) {

            if (i <= index) return Promise.reject(new Error('next() called multiple times'));

            index = i;

            let fn = middleware[i];
            if (i === middleware.length) {
                fn = next;
            }
            if (!fn) return Promise.resolve();

            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
    }
}


async function test1(ctx, next) {
    console.log('中间件1上');
    await next();
    console.log('中间件1下');
};

async function test2(ctx, next) {
    console.log('中间件2上');
    await next();
    console.log('中间件2下');
};

async function test3(ctx, next) {
    console.log('中间件3上');
    await next();
    console.log('中间件3下');
};
let middleware = [test1, test2, test3];

let cp = compose(middleware);

cp('ctx', function () {
    console.log('洋蔥V轉點');
});