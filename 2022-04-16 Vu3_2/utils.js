function isObject(value) {
    return typeof value == 'object' && value !== null;

    // typeof null => 'object' 超雷的
}

export {
    isObject
}