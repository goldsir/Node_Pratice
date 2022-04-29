import createRouteMap from './create-route-map';

export default function createMatcher(routes) {  // routes: 用戶傳入的配置

    // 扁平化用戶傳入的數據，創建路由映射表
    // [/, /about, /about/a, /about/b]
    // {/:comHome, /about::comAbout, /about/a: :comA, /about/b: :comB}

    let { pathList, pathMap } = createRouteMap(routes);  // 初始化配置


    function addRoutes(routes) {
        createRouteMap(routes, pathList, pathMap) // 添加新的路由
    }

    function match() {
    }

    return {
        match,
        addRoutes
    }
}