import { val, changeVal, readVal } from './module.js';


// es6模塊是動態關聯模塊中的值，輸出的是值的引用， 原始值變了， import加載的值也會跟著變。
changeVal(888);
readVal();          // output: val = 888
console.log(val);   // 這裡也是888
/************
    
    該怎麼解釋這個行為
        是app把val變成自己的變量， 還是引用它?
 
*/