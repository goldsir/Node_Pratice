import { observe } from "./observe";

export function initState(vm) {

    const options = vm.$options;

    if (options.data) {

        initData(vm)
    }
}

function initData(vm) {

    let data = vm.$options.data;

    data = typeof data === 'function' ? data.call(vm) : data;

    //------------------------ 
    vm._data = data;
    let keys = Object.keys(data);
    keys.forEach(key => {

        Object.defineProperty(vm, key, {

            get() {
                return vm._data[key];
            }
            , set(newVlue) {
                vm._data[key] = newVlue;
            }
        })

    });
    //------------------------

    observe(data);
}