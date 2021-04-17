function giveMeAPromise(ms){
    return new Promise((resolove, reject)=>{

        setTimeout(() => {
            resolove(ms);
        }, ms);

    });    
}




async function go(){

    let ms1 = await giveMeAPromise(1000);
    console.log(ms1);

    console.log('i am waiting');
    
    let ms2 = await giveMeAPromise(3000);
    console.log(ms2);
    
    console.log('done');

}
console.log('start');
go();
console.log('end');
