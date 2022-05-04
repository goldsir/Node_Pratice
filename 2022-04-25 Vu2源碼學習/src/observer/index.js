import { arrayMethods } from './array.js'
import { isObject } from '../util.js'
import Dep from './dep.js';

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


    observe(value) // 遞迴層層劫持
    let dep = new Dep; // 每個屬性都有一個dep

    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {

            // 每個屬性都對應著自己的watcher => 取值表示頁面用這個值來渲染
            if (Dep.target) {
                dep.depend();
            }

            return value  // 不可以return data[key]
        }
        , set(newValue) {
            if (newValue === value) return;
            observe(newValue) // 改變屬性值為一個新對象，就再劫持
            value = newValue; // 不可以 data[key] = newValue
            dep.notify(); // 通知依賴的watcher來進行更新操作
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