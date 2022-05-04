import { mergeOptions } from './util.js'

export function initGlobalAPI(Vue) {// 整合了全局相關api

    Vue.options = {}

    Vue.mixin = function (mixin) {
        // this = Vue (大V)
        this.options = mergeOptions(this.options, mixin);  // 實現2個對象合併
    }

    //Vue.mixin({ a: 1, beforeCreate() { console.log('mxin1'); } });
    //Vue.mixin({ b: 2, beforeCreate() { console.log('mxin2'); } });  // 給了2次 beforeCreate 要併成陣列

    console.log(Vue.options);
}

/*
    要把 Vue.options、options1、options2、options3 合併成一個

        Vue.mixin({});  // options1
        Vue.mixin({});  // options2
        Vue.mixin({});  // options3
*/ 