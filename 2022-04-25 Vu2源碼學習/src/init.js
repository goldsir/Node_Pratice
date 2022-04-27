import initState from './state'

export default function initMixin(Vue) {

    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        initState(vm);

        //  如果有傳入el屬性，就要渲染模版
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}