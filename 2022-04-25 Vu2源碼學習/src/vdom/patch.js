
export function patch(oldVnode, vnode) { // 真的操作到dom的地方

    let el = createElm(vnode);
    let parentElm = oldVnode.parentNode;
    parentElm.insertBefore(el, oldVnode.nextSibling)
    parentElm.removeChild(oldVnode)
}

function createElm(vnode) {


    let { tag, data, key, children, text } = vnode;
    if (typeof tag == 'string') {

        vnode.el = document.createElement(tag);

        //元素上有屬性
        updateAttrs(vnode);

        children.forEach((child) => {
            vnode.el.appendChild(createElm(child));
        })
    }
    else {
        vnode.el = document.createTextNode(text);
    }

    return vnode.el
}

function updateAttrs(vnode) {

    let el = vnode.el
    let attrs = vnode.data || {}

    Object.keys(attrs).forEach((key) => {

        if ('style' == key) {
            Object.keys(attrs.style).forEach((style) => {
                el.style[style] = attrs.style[style]
            });
        }
        else if ('class' == key) {
            el.className = el.class
        } else {
            el.setAttribute(key, attrs[key]);
        }
    });
}

// dom結構是不會變的