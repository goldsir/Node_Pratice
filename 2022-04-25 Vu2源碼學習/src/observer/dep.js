let id = 0;

class Dep {//用來收集watcher
    constructor() {
        this.id = id++;
        this.subs = [];   // dep可以存多個watcher; 一個watcher可以對應多個dep => 多對多關係
    }

    depend() { // observer/index.js  defineReactive/get()

        // 讓 Dep.target = watcher 記住這個dep
        // Dep.target 利用了js單線程機制才能實現， 不然watcer會混亂
        Dep.target.addDep(this); // 繞到爆炸
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    notify() {// 發佈訂閱模式
        this.subs.forEach(watcher => watcher.update());  // observer/index.js  defineReactive/get()
    }
}
Dep.target = null;

let stack = [];
export function pushTarget(watcher) {

    Dep.target = watcher;
    stack.push(watcher);

}

export function popTarget() {

    stack.pop();
    Dep.target = stack[stack.length - 1];

}

export default Dep;