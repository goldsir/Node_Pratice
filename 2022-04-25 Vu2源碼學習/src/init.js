import initState from './state'

export default function initMixin(Vue) {

    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        initState(vm);

    }
}


/*
    這裡很好玩， exprt一個函式， 接受Vue做為參數
    並在函式中去擴充Vue的原型
    可以讓不同功能拆分在獨立的檔案中來完成
*/