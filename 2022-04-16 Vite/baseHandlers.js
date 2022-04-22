const { isObject } = require('./utils');

const { reactive
    , shallowReactive
    , readonly
    , shallowReadonly } = require('./reactive')

const get = createGetter(false, false);
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true, false);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();
const shallowSet = createSetter(true);

function createGetter(isReadonly = false, isShallow = false) {

    return function get(target, key, receiver) { // 攔截獲取功能

        let res = Reflect.get(target, key, receiver);  // 等價 target[key]        

        if (!isReadonly) {// 非唯讀， 值可能被改， 所以要收集依賴

            // 等數據變化更新對應的視圖

        }

        if (isShallow) {
            return res
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);  // 取值時候才做代理 (響應式)
        }

        console.log('PROXY~~~~~');
        return res;
    }

}

function createSetter(shallowFlag = false) { // 攔截設置功能

    return function set(target, key, value, receiver) {

        return Reflect.set(target, key, value, receiver)  // receiver 在繼承關係中有用
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


module.exports = {
    mutableHandler
    , shallowReactiveHandler
    , readonlyHanlder
    , shallowReadonlyHandler
}