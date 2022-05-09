function isObject(value) {
    return typeof value == 'object' && value !== null;

    // typeof null => 'object' 超雷的
}

function isInteger(value) {
    return parseInt(value) + '' == value;
}

function isArrary(value) {
    return Array.isArray(value);
}

function hasOwnProperty(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key)
}

export {
    isObject
    , isInteger
    , isArrary
    , hasOwnProperty
}