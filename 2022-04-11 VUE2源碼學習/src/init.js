import { initState } from "./state";

export default function initMixin(Vue) {

    Vue.prototype._init = function (options) {

        const vm = this;

        vm.$options = options;

        initState(vm) // props data methods computed watch

        if (vm.$options.el) {

            vm.$mount(vm.$options.el)

        }
    }

    // https://www.bilibili.com/video/BV1DQ4y1z7TK?t=3734.1
    Vue.prototype.$mount = function (el) {

        el = document.querySelector(el);

    }

}