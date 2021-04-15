function getDateStr_FromDate(timestamp) {
    let time = new Date(timestamp);
    let year = time.getFullYear();
    let month = String(time.getMonth() + 1); // month value: 0(一月) ~ 11(十二月)
    let date = String(time.getDate());
    let hour = String(time.getHours());
    let min = String(time.getMinutes());
    let second = String(time.getSeconds());

    if (Number.parseInt(month) < 10) {
        month = `0${month}`;
    }

    if (Number.parseInt(date) < 10) {
        date = `0${date}`;
    }

    if (Number.parseInt(hour) < 10) {
        hour = `0${hour}`;
    }

    if (Number.parseInt(min) < 10) {
        min = `0${min}`;
    }

    if (Number.parseInt(second) < 10) {
        second = `0${second}`;
    }

    return `${year}-${month}-${date} ${hour}:${min}:${second}`;
}

function dateSplitByMin(date, min) {
    // date 是一個 yyyy-MM-dd 的字串
    let y = date.slice(0, 4); //不含end
    let m = date.slice(5, 7);
    let d = date.slice(8, 10);

    let count = (24 * 60) / min; // 算出一天全部有多少分鐘，再除掉min，得到迴圈計數器(以秒為單位)

    let list = [];
    for (let i = 0; i < count; i++) {
        // new Date(year, month, day, hour, minutes, seconds, milliseconds);
        let year = parseInt(y, 10);
        let month = parseInt(m, 10);
        let day = parseInt(d, 10);

        let start = new Date(year, month - 1, day, 0, 0, 0, 0);
        let end = new Date(year, month - 1, day, 0, 0, 0, 0);

        start.setSeconds(start.getSeconds() + i * min * 60); // setSeconds 沒傳回新的實例哦
        end.setSeconds(end.getSeconds() + (i + 1) * min * 60 - 1); // setSeconds 沒傳回新的實例哦

        list.push({
            start: getDateStr_FromDate(start),
            end: getDateStr_FromDate(end)
        });
    }

    return list;
}

/*
let dateList = dateSplitByMin('2021-04-08', 60);
console.log(dateList);*/


let timestamp = new Date().getTime();
console.log(getDateStr_FromDate(timestamp));


/*
<a href = 'http:127.0.01:3000/PGAPI?start=XXXX&end=XXXX'> 2021-04-08 23:00:00 ~ 2021-04-08 23:59:59<a>

?start=XXXX&end=XXXX
*/