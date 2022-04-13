import arrayPrototype from './array'

class Observer {

    constructor(data) {

        Object.defineProperty(data, '__ob__', {
            value: this
            , enumerable: false
        });


        if (Array.isArray(data)) {  // push, pop, shift, unshift, reverse, sort, splice

            data.__proto__ = arrayPrototype;
            this.observeArray(data)
        }
        else {

            this.walk(data);
        }
    }

    observeArray(data) {

        data.forEach(item => observe(item));

    }

    walk(data) { // 遍歷對象不使用for in (會上到原型鏈)

        let keys = Object.keys(data);
        keys.forEach((key) => definReactive(data, key, data[key]));
    }
}

function definReactive(data, key, value) {

    observe(value);  // 套娃了

    Object.defineProperty(data, key, {

        get() {

            return value;

        }
        , set(newValue) {

            if (newValue === value) {
                return
            }
            observe(newValue);
            value = newValue;
        }
    });
}

export function observe(data) {

    if (typeof data !== 'object' || data == null) {
        return;
    }

    if (data.__ob__) { // 被代理過了
        return data;
    }

    return new Observer(data);
}