import { initMixin } from './init';
import { initMount } from './init_mount.js'
import { lifecycleMixin } from './lifecycle'
import { renderMinin } from './vdom/index.js';

function Vue(options) {
    this._init(options);
}

/*
對Vue原型進行擴展
    這裡很好玩， import一個函式， 接受Vue做為參數
    並在該函式中去擴充Vue的原型
    可以讓不同功能拆分在獨立的檔案中來完成
*/
initMixin(Vue);
initMount(Vue);
lifecycleMixin(Vue);
renderMinin(Vue);

export default Vue;