import install from "./install";
import createMatcher from './create-matcher'
import HashHistory from "./history/hash";

export default class VueRouter {

    constructor(options) {  // ref: router/index.js

        // 路由: 根據不同的路徑，跳轉到不同的組件
        // console.log(options.routes);

        // match: 負責匹配路徑
        // addRoutes: 動態添加路由配置
        this.matcher = createMatcher(options.routes || []);

        // 創建路由系統
        this.mode = options.mode || 'hash';

        this.history = new HashHistory(this);

    }

    // 在 install 那邊調的
    // 那邊透過組件實例.options 可訪問 VueRouter 實例
    init(rootComponent) {

        // 根據當前路徑 顯示到指定的組件
        const hostory = this.history;
        history.transactionTo(history.getCurrentLocation());

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