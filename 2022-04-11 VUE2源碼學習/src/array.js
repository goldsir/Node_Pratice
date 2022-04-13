let oldArrayPrototype = Array.prototype;

let arrayPrototype = Object.create(oldArrayPrototype); // arrayPrototype.__proto__ = Array.prototype;


let methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];

methods.forEach(method => {

    arrayPrototype[method] = function (...args) {

        console.log(method, '數組修改了，觸發視圖更新');

        let inserted;

        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
            default: break;
        }

        if (inserted) {// 對陣列中新增的數據項再進行觀測

            this.__ob__.observeArray(inserted)

        }

        return oldArrayPrototype[method].call(this, ...args);

    }
});

export default arrayPrototype;