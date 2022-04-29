
export default class History {
    constructor(router) {
        this.router = router;
    }

    getCurrentLocation() {
        return getHash();
    }


    getHash() {
        // 要考慮各家瀏覽器兼容性
        // 練習就不管了， 先簡單寫
    }
}