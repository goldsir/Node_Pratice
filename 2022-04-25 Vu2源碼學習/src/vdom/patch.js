
export function patch(oldVnode, vnode) {

    const isRealElement = oldVnode.nodeType;  // 1=html節點 3=文字節點

    if (isRealElement) {
        //要獲取父節點，將當前節點的下一個元素做為參照物，插入後，刪除老節點
        debugger
        let oldElm = oldVnode;
        const parentNode = oldElm.parentNode;
        let el = createElm(vnode);
        parentNode.insertBefore(el, oldElm.nextSibling);
        parentNode.removeChild(oldElm);
    }

    // diff算法
}

function createElm(vnode) {

}

// dom結構是不會變的