let dataStr = 'a,b,';

dataArr = dataStr.split(',');


console.log(dataArr);

let obj = {
    "a": dataArr[0]
    , "b": dataArr[1]
    , "c": dataArr[2]
}

console.log(obj);