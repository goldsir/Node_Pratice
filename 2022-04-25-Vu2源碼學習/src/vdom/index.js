import { patch } from './patch.js'

export function renderMixin(Vue) {

    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;

        // render函式使用了 with(this){return...} 所以要用 render.call(vm) 確保this的正確指向
        let vnode = render.call(vm);
        return vnode;
    }

    Vue.prototype._c = function () {// 創建虛擬dom
        return createElement(...arguments);
    }

    Vue.prototype._s = function (value) {  // JSON.stringify
        return value == null ? '' : (typeof value == 'object') ? JSON.stringify(value) : value;
    }

    Vue.prototype._v = function (text) { //創建虛擬dom文本元素

        let textNode = createTextVNode(text);
        return textNode;
    }
}

function vnode(tag, data, key, children, text) {
    return {
        tag, data, key, children, text
    }
}

export function createElement(tag, data = {}, ...children) {

    let key = data.key;
    if (key) delete data.key;  // key不用放到html上

    return vnode(tag, data, key, children, undefined);
}

export function createTextVNode(text) {

    return vnode(undefined, undefined, undefined, undefined, text);
}