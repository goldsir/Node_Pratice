import initMixin from "./init"

function Vue(options) {

    this._init(options)
}


initMixin(Vue)  // 拆分檔案去擴展Vue的功能

export default Vue