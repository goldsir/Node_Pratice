let PENDING = 'pending';
let FULFILLED = 'fulfilled';
let REJECTED = 'rejected';

function MyPromise(executor) {

    let self = this;
    self.status = PENDING;
    self.value = undefined;
    self.reason = undefined;

    self.onFulfilledCallback = [];
    self.onRejectedCallback = [];

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilledCallback.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejectedCallback.forEach(fn => fn());
        }
    }

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }

};

MyPromise.prototype.then = function (onFulfilled, onRejected) {

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => { return value };
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err };

    let self = this;
    let promise2 = new MyPromise((resolve, reject) => {

        let onFulfilledTask = () => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        };

        let onRejectedTask = () => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            }, 0);
        };

        if (self.status === PENDING) {
            self.onFulfilledCallback.push(onFulfilledTask);
            self.onRejectedCallback.push(onRejectedTask);
        }

        if (self.status === FULFILLED) { 
			onFulfilledTask() ;
		}

        if (self.status === REJECTED) { 
			onRejectedTask() ;
		}
    });

    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {

    if (promise2 === x) {
        return reject(new TypeError(''));
    }

    if (x != null && (typeof x === 'object' || typeof x === 'function')) {

        let then;
        try {
            then = x.then;
        }
        catch (err) {
            reject(err);
        }

        if (typeof then === 'function') {

            let called;

            try {
                then.call(x, (y) => {

                    if (called) return; called = true;
                    resolvePromise(promise2, y, resolve, reject);

                }, (err) => {
                    if (called) return; called = true;
                    reject(err);
                });
            }
            catch (err) {
                if (called) return; called = true;
                reject(err);
            }

        } else {
            resolve(x);
        }
    }
    else {
        resolve(x);
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {}

    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
}

module.exports = MyPromise;

/*
	測試腳本(cmd mode)
	    npm i promises-aplus-tests -g
		promises-aplus-tests MyPromise.js
*/