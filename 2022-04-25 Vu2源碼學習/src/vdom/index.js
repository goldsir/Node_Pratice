function vnode(vm, tag, data, children, text, key) {
    return {
        vm, tag, data, children, text, key
    }
}

export function createElement(vm, tag, data = {}, ...children) {

    return vnode(vm, tag, data, children, data.key, null);
}

export function createTextNode(vm, text) {

    return vnode(vm, null, null, null, null, text);
}


