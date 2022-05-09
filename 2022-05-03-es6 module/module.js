export let val = 100;

export function readVal() {
    console.log(`val = ${val}`);
}

export function changeVal(newVal) {

    val = newVal;
}


// 每個export都要有自己的名字
export const arrowFn = () => { };