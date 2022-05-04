let id = 0;
class Dep {//用來收集watcher
    constructor() {
        this.id = id++;
        this.subs = [];   // dep可以存多個watcher; 一個watcher可以對應多個dep => 多對多關係
    }

    depend() {
        this.subs.push(Dep.target);
    }

    notify() {
        this.subs.forEach(watcher => watcher.update());
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