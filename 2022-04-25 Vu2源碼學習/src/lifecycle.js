import { createElement, createTextNode } from './vdom/index.js'
import { patch } from './vdom/patch.js'


export function lifecycleMixin(Vue) {

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
        console.log(patch);
        let vm = this;
        let el = vm.$el;
        vm.$el = patch(el, vnode);
    }
}

export function mountComponent(vm, el) {

    vm.$el = el;
    const updateComponent = () => {

        vm._update(vm._render());
    }

    updateComponent()
}