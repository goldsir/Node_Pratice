import { createElement, createTextNode } from './vdom/index.js'
import { patch } from './vdom/patch.js'


export function lifecycleMixin(Vue) {

}

export function mountComponent(vm, el) {

    vm.$el = el;
    const updateComponent = () => {

        vm._update(vm._render());
    }

    updateComponent()
}