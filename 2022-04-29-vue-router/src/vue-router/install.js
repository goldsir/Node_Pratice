
// 這裡會依賴Vue構造函式
/*import Vue from "vue"; 但是我們不引入Vue*/

export let _Vue;
export default function install(Vue) {  // 自動會注入Vue

    console.log('VueRouter Insall');
    _Vue = Vue;

    /*
        1. 注冊全局屬性 $router $route
        2. 注冊全局指令 v-scroll
        3. 注冊全局組件 router-view router-link
     */

    Vue.mixin({
        beforeCreate() {

            let options = this.$options;

            if (options.router) {
                console.log(`mixin 根組件: ${options.name}`);

                this._routerRoot = this; // 記錄根組件引用
                this._router = options.router;
                this._router.init(this) // this一定是根實例
            } else {//子組件
                console.log(`mixin 子組件: ${options.name}`);

                // 不管往下有幾代子組件，都能拿到 根組件.router
                this._routerRoot = this.$parent && this.$parent._routerRoot;  // && 成立取右值

                // 子組件， 子子組件， 子子子... 取路由: this._routerRoot._router
            }
        },
    });
}

/*
    Vue.use(plugin)
        
    如果插件是一個對象，必須提供 install 方法。
        如果插件是一個函數，它會被作為 install 方法。install 方法調用時，會將 Vue 作為參數傳入。
        Vue.use(plugin)調用之後，插件的install方法就會默認接受到一個參數，這個參數就是Vue
*/