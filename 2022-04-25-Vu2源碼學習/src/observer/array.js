
// 拿到數組原型上的方法
let oldArrayMethods = Array.prototype;

export const arrayMethods =
    Object.create(oldArrayMethods);  // arrayMethods.__proto__ = arrayMethods

const methods = [
    'push'
    , 'pop'
    , 'shift'
    , 'unshift'
    , 'reverse'
    , 'sort'
    , 'splice'
]

methods.forEach((method) => {

    // ...args (a,b,c) => [a,b,c], args變成一個array
    arrayMethods[method] = function (...args) {// 函式切片， 調用原生array方法之前，插入自己的邏輯

        console.log('劫持數組方法被調用了');
        const result = oldArrayMethods[method].apply(this, args);
        let ob = this.__ob__;


        // 如果陣列新增的元素是object，也要找出來劫持
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':  // array.splice(start, deleteCount, item...)
                inserted = args.slice(2)  // splice方法新增的元素在索引值2之後
            default:
                break;
        }

        if (inserted) {
            ob.observeArray(inserted);
        }

        return result;
    }
});


/*

    Array.prototype.push()
        The push() method adds one or more elements to the end of an array 
        and returns the new length of the array.


*/