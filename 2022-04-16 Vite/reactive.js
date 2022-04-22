const mutableHandlers = {}
const shallowReactiveHandlers = {}

const readonlyHanlders = {}
const shallowReadonlyHandlers = {}

function reactive(target) {
    console.log('reactive');
    return createReactiveObject(target, false, mutableHandlers);
}

function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReadonlyHandlers)
}


function readonly(target) {
    return createReactiveObject(target, true, readonlyHanlders)
}

function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers)
}

// core: new Proxy()
function createReactiveObject(target, isReadonly, baseHandlers) {

}

module.exports = {
    reactive, shallowReactive, readonly, shallowReadonly
}
