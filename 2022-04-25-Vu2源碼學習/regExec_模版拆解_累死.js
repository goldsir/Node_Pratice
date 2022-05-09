// https://github.com/vuejs/vue/tree/dev/src/compiler

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
let str = 'abc {{_abc}} def {{_def}} efg'

/*
    0: a
    1: b
    2: c
    3:  
    4: {
    5: {
    6: _
    7: a
    8: b
    9: c
    10: }
    11: }
    12:  
    13: d
    14: e
    15: f
    16:  
    17: {
    18: {
    19: _
    20: d
    21: e
    22: f
    23: }
    24: }
    25:  
    26: e
    27: f
    28: g
*/


let startIndex = defaultTagRE.lastIndex = 0;
let tokens = [];
let match;
while ((match = defaultTagRE.exec(str)) !== null) { // 匹配失败，exec() 方法返回 null

    let endIndex = match.index;
    if (endIndex > startIndex) {//截出沒花括號的文本
        let text = str.slice(startIndex, endIndex);
        console.log(`匹配到文本: ${text}`);
    }

    console.log(`匹配到變量: ${match[1]}`);
    startIndex = endIndex + match[0].length;
}

if (startIndex < str.length) {
    let text = str.slice(startIndex);
    console.log(`匹配到文本: ${text}`);
}


/*
    match
    [
        '{{_abc}}',
        '_abc',
        index: 4,
        input: 'abc {{_abc}} def {{_def}} efg',
        groups: undefined
    ]


    [
        '{{_def}}',
        '_def',
        index: 17,
        input: 'abc {{_abc}} def {{_def}} efg',
        groups: undefined
    ]


*/