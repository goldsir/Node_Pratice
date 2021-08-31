"use strict";

/**
 * Expose compositor.
 */

module.exports = compose;

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError("Middleware stack must be an array!");
    for (const fn of middleware) {
        if (typeof fn !== "function") throw new TypeError("Middleware must be composed of functions!");
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called middleware #
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error("next() called multiple times"));
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

let middleware = [];

let ctx1 = { "ctx1": "ctx1" };
let ctx2 = { "ctx2": "ctx2" };
let ctx3 = { "ctx3": "ctx3" };

middleware.push((ctx1, next) => {
    console.log(1);
    next()
    next()
});

middleware.push((ctx2, next) => {
    console.log(2);
    next();
});

middleware.push((ctx3, next) => {
    console.log(3);
    next();
});

let run = compose(middleware);
//console.log(run.toString());
run();