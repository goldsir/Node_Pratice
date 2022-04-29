export default function createRouteMap(routes, oldPathList, oldPathMap) { // 用戶傳入的路由配置

    //console.log(routes, oldPathList, oldPathMap);  // time: 39:37

    let pathList = oldPathList || [];
    let pathMap = oldPathMap || Object.create(null);

    routes.forEach((route) => {

        addRouteRecord(route, pathList, pathMap);

    });

    return {
        pathList
        , pathMap
    }
}

function addRouteRecord(route, pathList, pathMap, parent) {

    let { path, component } = route;

    if (parent) {
        path = parent.path + '/' + path;
    }

    let record = { path, component };

    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = record
    }

    if (route.children) {
        route.children.forEach((child) => {
            addRouteRecord(child, pathList, pathMap, route);
        });
    }
}


// Object.create(null) 很乾淨的空物件，連原型鏈也沒有