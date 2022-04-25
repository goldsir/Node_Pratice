import initMixin from './init';

function Vue(options) {
    this._init(options);
}

initMixin(Vue);  // 對Vue原型進行擴展
export default Vue;