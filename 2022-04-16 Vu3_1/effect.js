export function effect(fn, options = {}) {

    // 要讓effect變成響應式的 => 數據變化 重新執行一次自己
    const reactiveEffect = createReactiveEffect(fn, options);

    // 默認行為, 會自己先運行一次
    if (!options.lazy) {
        reactiveEffect();  // createReactiveEffect返回值須為function
    }

    return reactiveEffect; // 這個返回值好像沒用到
}


let uid = 0
let activeEffect; // 當前作用的effect
const reactiveEffectStack = []
function createReactiveEffect(fn, options = {}) {

    // 要讓reactive物件的屬性跟effect產生關聯(多對多)
    const reactiveEffect = function () {

        if (!reactiveEffectStack.includes(reactiveEffect)) {
            //保證同一個stack不會重複加入棧中, 根據函式的引用地址判斷

            try {
                activeEffect = reactiveEffect;  // *.*.* 重要
                reactiveEffectStack.push(reactiveEffect)  // 入棧
                return fn()
            } finally {
                reactiveEffectStack.pop() // 出棧
                activeEffect = reactiveEffectStack[reactiveEffectStack.length - 1];
            }
        }
    }

    reactiveEffect.uid = uid++;
    reactiveEffect.options = options;
    reactiveEffect.raw = fn;
    reactiveEffect._isEffect = true;  // 用來標識自己是個響應式的effect函式
    return reactiveEffect;
}

// @28min
const targetMap = new WeakMap()
export function track(target, operatorType, key) { // 暴露給 baseHandlers.createGetter 用

    // 這裡需要一個 reactiveEffect，怎麼拿 => activeEffect 全局變量拿

    /*
        每個key 可能對應多個effect

        {name: 'tc', age: 8}
            |-> name [effect, effect ...]
            |-> age [effect, effect ...]

        結構 weakMap
            Key: target (Object)
            value: new Map
                        |-> key, new Set()

    */

    if (activeEffect === undefined) { // 不用收集這個屬性 (屬性不在effect中取值過)
        return;
    }

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map));
    }// 精華: (depsMap = new Map())


    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set));
    }

    if (!dep.has(activeEffect)) {
        dep.add(key, effect);
    }

    console.log(targetMap);
}