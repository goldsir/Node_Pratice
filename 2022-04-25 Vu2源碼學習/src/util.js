export function isObject(data) {

    // typeof null == 'object' 雷包
    return typeof data === 'object' && data !== null
}


const LIFE_CYCLE_HOOKS = [
    'beforeCreate'
    , 'created'
    , 'beforeMount'
    , 'mounted'
    , 'beforeUpdate'
    , 'updated'
    , 'beforeDestroy'
    , 'destroyed'
]

let strategies = {}

function mergeHook(parentVal, childVal) {

    if (childVal) {
        if (parentVal)  // 有新也有舊
        {
            if (typeof parentVal === 'function') {
                parentVal = [parentVal];
            }

            return parentVal.concat(childVal);
        } else {// 有新沒有舊
            return [childVal];
        }
    } else {
        return parentVal
    }
}

LIFE_CYCLE_HOOKS.forEach(hook => {
    strategies[hook] = mergeHook
});

export function mergeOptions(parent, child) {  // 簡單合併，沒考慮多層次

    const options = {};

    for (let key of Object.keys(parent)) {
        mergeField(key);
    }

    for (let key of Object.keys(child)) {  // 可能屬性是兒子有，爸爸沒有

        if (parent.hasOwnProperty(key) == false) {
            mergeField(key)
        }
    }

    function mergeField(key) {

        if (strategies[key]) {// 特殊屬性 要合併成一個陣列  (生命週期鉤子)
            return options[key] = strategies[key](parent[key], child[key])
        }

        if ((typeof parent[key] === 'object') && (typeof child[key] === 'object')) {
            options[key] = {
                ...parent[key]
                , ...child[key]
            };
        } else if (child[key] == null) { // 兒子沒有，爸爸有，以有的為主
            options[key] = parent[key];
        }
        else { // 爸爸有，兒子也有， 以兒子為主
            options[key] = child[key];
        }


    }

    return options;
}