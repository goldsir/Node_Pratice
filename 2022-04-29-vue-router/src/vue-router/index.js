import install from "./install";
import createMatcher from './create-matcher'

export default class VueRouter {

    constructor(options) {  // ref: router/index.js

        // 路由: 根據不同的路徑，跳轉到不同的組件
        console.log(options.routes);

        // match: 負責匹配路徑
        // addRoutes: 動態添加路由配置
        this.matcher = createMatcher(options.routes || []);
    }

    // 在 install 那邊調的
    // 那邊透過組件實例.options 可訪問 VueRouter 實例
    init(rootComponent) {
        let options = rootComponent.$options;
        console.log(`VueRouter.init : ${rootComponent.name}`);
    }
}

VueRouter.install = install;


/*
    options.routes

        (2) [{…}, {…}]
            0: {path: '/', name: 'home', component: {…}}
            1: {path: '/about', name: 'about', component: {…}, children: Array(2)}
            length: 2
            [[Prototype]]: Array(0)
*/