let parent = {
    a: { a: 100 }
    , b: { b: 200 }
}

let child = {
    a: { a: 666, aa: 6666 }
    , b: { b: 888, bb: 8888 }
    , c: { c: 999, bb: 9999 }
}

let merge = {}

for (let key of Object.keys(parent)) {

    merge[key] = {
        ...parent[key]
        , ...child[key]
    }
}

console.log(merge);