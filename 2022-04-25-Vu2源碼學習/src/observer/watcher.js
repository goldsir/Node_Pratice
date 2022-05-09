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

        this.depsId = new Set(); // Set不能放重複項
        this.deps = [];
        this.get();  // 這行位置別放到上面, this.depsId 會是undefined 順序不對 造成程式錯誤
    }

    get() {
        pushTarget(this);   // 把watcher存起來
        this.getter();      // 渲染watcher的執行 => 調用 exprOrFn
        popTarget();        // 移除watcher
    }

    update() {
        this.get();
    }

    addDep(dep) {  // watcher裡不能存放重複的dep, dep裡不能存放重複的watcher
        console.log('--------', this);
        let id = dep.id;  // id是唯一的        
        if (this.depsId.has(id) == false) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);   // 繞到爆炸 -> 兩兩互記
        }
    }
}

// Vue更新頁面是以組件為單位的， 所以watcher要跟資料屬性關聯上， 每個vue實例都有一個watcher