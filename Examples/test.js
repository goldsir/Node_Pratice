let datas = [
    {
        "id": 2,
        "category": "心情"
    },
    {
        "id": 3,
        "category": "閒聊"
    },
    {
        "id": 4,
        "category": "購物"
    },
    {
        "id": 5,
        "category": "八卦"
    },
    {
        "id": 6,
        "category": "親子"
    },
    {
        "id": 7,
        "category": "兩性"
    },
    {
        "id": 8,
        "category": "3C"
    },
    {
        "id": 1,
        "category": "其它"
    }
]


let res = datas.find((item, index) => {

    console.log(item, index);
    return item.id === 99;

})

console.log(res);