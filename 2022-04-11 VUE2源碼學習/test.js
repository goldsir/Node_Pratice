function fn(...args) {
    console.log(typeof args, Array.isArray(args), Object.prototype.toString.call(args));


}
fn(1, 2, 3, 'a')
//---------------------------------

setTimeout(() => {
    console.log(1);
}, 0);

setTimeout(() => {
    console.log(2);
}, 0);

new Promise((resolve, reject) => {

    console.log(3);
    resolve()

}).then(() => { console.log(4); }).then(() => { console.log(5); });

console.log('a');
