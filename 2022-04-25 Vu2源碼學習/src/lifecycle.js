import { patch } from './vdom/patch.js'

export function lifecycleMixin(Vue) {

    Vue.prototype._update = function (vnode) {

        let vm = this;
        let el = vm.$el;
        vm.$el = patch(el, vnode);
    }
}

export function mountComponent(vm, el) {

    vm.$el = el;
    const updateComponent = () => {

        let vnode = vm._render();
        vm._update(vnode);
    }

    updateComponent()
}