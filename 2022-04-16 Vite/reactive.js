const { isObject } = require('./utils');
const {
    mutableHandler
    , shallowReactiveHandler
    , readonlyHanlder
    , shallowReadonlyHandler

} = require('./baseHandlers')


function reactive(target) {

    return createReactiveObject(target, false, mutableHandler);
}

function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandler)
}

// 沒setter
function readonly(target) {
    return createReactiveObject(target, true, readonlyHanlder)
}

function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandler)
}

// WeakMap 會自動gc，不會造成內存洩漏，`key只能是object`
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly = false, baseHandlers) {

    // Proxy只能搞object，不是object就不搞
    if (!isObject(target)) {
        return target;
    }

    //2個map， 唯讀跟非唯讀， 用flag區分
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;

    const existProxy = proxyMap.get(target); // 查一下這個東西有沒有被代理過

    if (existProxy) {// If the key can't be found, undefined is returned.
        return existProxy
    }

    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);  // 將代理緩存， 用來判斷 不可重複代理
    return proxy;
}


module.exports = {
    reactive
    , shallowReactive
    , readonly
    , shallowReadonly
}
