import initState from './state'
import { mergeOptions } from './util';

export function initMixin(Vue) {

    Vue.prototype._init = function (options) {

        const vm = this;

        // 將全局的options跟用戶的options合併
        vm.$options = mergeOptions(vm.constructor.options, options);

        initState(vm);

        //  如果有傳入el屬性，就要渲染模版
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}