import { isObject } from './utils.js';
import { reactive, shallowReactive, readonly, shallowReadonly } from './reactive.js'
import { track } from './effect.js'
import { operatorType } from './operatorType.js'

const get = createGetter(false, false);
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true, false);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter(false);
const shallowSet = createSetter(true);

function createGetter(isReadonly = false, isShallow = false) {

    return function get(target, key, receiver) { // 攔截獲取功能

        let res = Reflect.get(target, key, receiver);  // 等價 target[key]        

        if (!isReadonly) {// 非唯讀， 值可能被改， 所以要收集依賴
            // 等數據變化更新對應的視圖 => effect函式收集
            console.log(`(非唯讀取值) read key ${key} 收集 effect`);

            track(target, operatorType.GET, key)

        }

        if (isShallow) {
            return res
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);  // 取值時候才做代理 (響應式)
        }


        return res;
    }

}

function createSetter(shallowFlag = false) { // 攔截設置功能

    return function set(target, key, value, receiver) {

        return Reflect.set(target, key, value, receiver)  // receiver 讓this正確指向
    }

}

const mutableHandler = {
    get
    , set
}

const shallowReactiveHandler = {
    get: shallowGet
    , set: shallowSet
}

const readonlyHanlder = {// 唯讀, setter 拋出異常
    get: readonlyGet
    , set: (target, key) => {
        console.warn(`set on key ${key} failed`)
    }
}


// 僅第一層不能更改
const shallowReadonlyHandler = {
    get: shallowReadonlyGet
    , set: (target, key) => {
        console.warn(`set on key ${key} failed`)
    }
}

export {
    mutableHandler
    , shallowReactiveHandler
    , readonlyHanlder
    , shallowReadonlyHandler
}