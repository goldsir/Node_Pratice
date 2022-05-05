import { pushTarget, popTarget } from './dep.js'

let id = 0;
export default class Watcher {  // lifecycle.js_mountComponent 渲染時會有一個watcher

    constructor(vm, exprOrFn, callback, options) {

        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++;

        if (typeof exprOrFn === 'function') { // vm._update(vm_render())
            this.getter = exprOrFn;
        }

        this.get();
    }

    get() {
        pushTarget(this);   // 把watcher存起來
        this.getter();      // 渲染watcher的執行 => 調用 exprOrFn
        popTarget();        // 移除watcher
    }

    update() {
        this.get();
    }
}

// Vue更新頁面是以組件為單位的， 所以watcher要跟資料屬性關聯上， 每個vue實例都有一個watcher