import { pushTarget, popTarget } from './dep.js'

let id = 0;
export default class Watcher {

    constructor(vm, exprOrFn, callback, options) {

        this.vm = vm;
        this.callback = callback;
        this.options = options;
        this.id = id++;

        if (typeof exprOrFn === 'function') {
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