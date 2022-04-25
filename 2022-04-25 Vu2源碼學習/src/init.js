import initState from './state'

export default function initMixin(Vue) {

    Vue.prototype._init = function (options) {

        const vm = this;
        vm.$options = options;

        initState(vm);



        //  如果有傳入el屬性，就要渲染頁面
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {

        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);

        // 模版順序 render()-> template -> el

        if (!options.render) {// 對模版進行編譯

            let template = options.template;

            if (!template && el) {
                template = el.outerHTML;
                console.log(template);
            }
        }
    }
}


/*
    這裡很好玩， exprt一個函式， 接受Vue做為參數
    並在函式中去擴充Vue的原型
    可以讓不同功能拆分在獨立的檔案中來完成
*/