import initState from './state'
import { init_mount } from './init_mount.js'

export default function initMixin(Vue) {

    init_mount(Vue);

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


/*
    這裡很好玩， export一個函式， 接受Vue做為參數
    並在函式中去擴充Vue的原型
    可以讓不同功能拆分在獨立的檔案中來完成
*/