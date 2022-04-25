export function isObject(data) {

    // typeof null == 'object' 雷包
    return typeof data === 'object' && data !== null
}