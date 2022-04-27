import { compileToFunction } from './compiler.js';
import { mountComponent } from './lifecycle.js'

export function init_mount(Vue) {

    Vue.prototype.$mount = function (el) {

        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);

        // 模版順序: render()-> template -> el

        if (!options.render) {// 對模版進行編譯

            let template = options.template;

            if (!template && el) {
                template = el.outerHTML;
            }

            const render = compileToFunction(template);
            options.render = render; // render函式 用模版編譯出來的
        }

        mountComponent(vm, el);

    }
}