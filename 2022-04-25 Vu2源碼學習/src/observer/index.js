import { arrayMethods } from './array.js'
import { isObject } from '../util.js'

class Observer {

    constructor(data) {

        Object.defineProperty(data, '__ob__', {  //  __ob__ 標示被劫持過了
            enumerable: false   // 很重要， 沒加會造成死循環            
            , configurable: false
            , value: this
        })

        if (Array.isArray(data)) {// 函數劫持: push shift unshift splice sort reverse pop

            data.__proto__ = arrayMethods;  // arrayMethods.__proto__ = oldArrayMethods

            // 如果陣列中的項目包含了object，也要被劫持           
            this.observeArray(data);
        }
        else {
            this.walk(data);
        }

    }

    observeArray(array) {

        array.forEach((item) => observe(item))

    }

    walk(data) {

        let keys = Object.keys(data);
        keys.forEach((key) => {
            defineReactive(data, key, data[key]);
        })
    }
}

function defineReactive(data, key, value) {// value會一直活在閉包中

    observe(value) // 層層劫持

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
            return value  // 不可以return data[key]
        }
        , set(newValue) {
            if (newValue === value) return;
            observe(newValue) // 改變屬性值為一個新對象，就再劫持
            value = newValue; // 不可以 data[key] = newValue
        }
    });

    // 透過value(閉包)而不是 data[key]取值，可以避免死循環
}

export function observe(data) {

    if (!isObject(data)) { // 不是object就退出
        return;
    }

    if (data.__ob__) {
        return data;  // 已經被劫持過了，直接返回
    }

    return new Observer(data);
}