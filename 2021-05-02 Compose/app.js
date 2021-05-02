const compose = require('./index');
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
