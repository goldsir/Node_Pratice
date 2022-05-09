import Watcher from './observer/watcher.js';
import { patch } from './vdom/patch.js'

export function lifecycleMixin(Vue) {

    Vue.prototype._update = function (vnode) {
        let vm = this;
        let el = vm.$el;
        vm.$el = patch(el, vnode); // 新替換掉舊的
    }
}

export function mountComponent(vm, el) {

    vm.$el = el;  // 真實的DOM元素

    const updateComponent = () => { // 渲染頁面
        let vnode = vm._render();// 返回虛擬dom -> _c _v _s
        vm._update(vnode);
    }

    callHook(vm, 'beforeMount');

    // 渲染watcher，每個組件都有一個watcher
    let watcher = new Watcher(vm, updateComponent, () => {
        callHook('vm', 'beforeUpdate');
    }, true); // true 代表是渲染watcher

    callHook(vm, 'mounted');
}

export function callHook(vm, hook) {  // 調用生命週期鉤子

    const handlers = vm.$options[hook];
    if (handlers) {
        handlers.forEach((handler) => {
            handler.call(vm);
        })
    }
}