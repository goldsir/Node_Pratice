import { patch } from './patch.js'

export function renderMinin(Vue) {
    Vue.prototype._c = function () {

        return createElement(this, ...arguments);
    }

    Vue.prototype._v = function () {
        return createTextNode(this, ...arguments);
    }

    Vue.prototype._s = function (value) {
        return JSON.stringify(value)
    }

    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode;
    }

    Vue.prototype._update = function (vnode) {

        let vm = this;
        let el = vm.$el;
        vm.$el = patch(el, vnode);
    }
}


function vnode(vm, tag, data, children, text, key) {
    return {
        vm, tag, data, children, text, key
    }
}

export function createElement(vm, tag, data = {}, ...children) {

    return vnode(vm, tag, data, children, data.key, null);
}

export function createTextNode(vm, text) {

    return vnode(vm, null, null, null, null, text);
}


