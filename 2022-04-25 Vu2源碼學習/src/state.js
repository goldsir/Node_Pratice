import { observe } from "./observer/index.js";

export default function initState(vm) {// vm 表示Vue實例

    const opts = vm.$options;

    if (opts.props) {
        initProps(vm)
    }

    if (opts.methods) {
        initMethods(vm);
    }

    if (opts.data) {
        initData(vm);
    }

    if (opts.computed) {
        initComputed(vm);
    }

    if (opts.watch) {
        initWatch(vm);
    }
}
function initProps(vm) { }
function initMethods(vm) { }
function initData(vm) {

    let data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data;
    vmDataProxy(vm, data);

    /*
        數據劫持方案 
            |- object -> Object.defineProperty
            |- array
    */

    observe(data)

}
function initComputed(vm) { }
function initWatch(vm) { }


function vmDataProxy(vm, data) {

    // 方便操作: vm_data.XXX => vm.XXX

    let keys = Object.keys(data);
    keys.forEach((key) => {

        Object.defineProperty(vm, key, {

            get() {
                return vm._data[key];
            },
            set(newValue) {
                vm._data[key] = newValue;
            }

        });
    });
}