import Watcher from './observer/watcher.js';
import { patch } from './vdom/patch.js'

export function lifecycleMixin(Vue) {

    Vue.prototype._update = function (vnode) {
        let vm = this;
        let el = vm.$el;
        vm.$el = patch(el, vnode);
    }
}

export function mountComponent(vm, el) {

    vm.$el = el;  // 真實的DOM元素

    const updateComponent = () => { // 渲染頁面
        let vnode = vm._render();// 返回虛擬dom -> _c _v _s
        vm._update(vnode);
    }


    // 渲染watcher，每個組件都有一個watcher
    new Watcher(vm, updateComponent, () => { }, true); // true 代表是渲染watcher
}

export function callHook(vm, hook) {

    const handlers = vm.options[hook];

}