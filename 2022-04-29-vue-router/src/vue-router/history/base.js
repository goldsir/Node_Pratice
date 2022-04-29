
export default class History {
    constructor(router) {
        this.router = router;
    }

    getCurrentLocation() {
        return getHash();
    }
}