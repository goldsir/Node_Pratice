let datas = `timepoint=1649298000000
playerID,extPlayerID,gameID,playSessionID,parentSessionID,startDate,endDate,status,type,bet,win,currency,jackpot,roundDetails
1648006525787,jimmywu,402,39659502608,null,2022-04-07 02:11:13,2022-04-07 02:11:40,C,R,40.00,0.00,VND2,0.00,"{""result"":""Banker"",""bets"":[{""c"":""Plyr"",""a"":""40.00""}]}"
1648006525787,jimmywu,401,39659602608,null,2022-04-07 02:19:00,2022-04-07 02:19:27,C,R,40.00,80.00,VND2,0.00,"{""result"":""Player"",""bets"":[{""c"":""Plyr"",""a"":""40""}]}"`


let datasArry = datas.split('\n');
let columns = datasArry[1].split(',');
let datas_ok = [];

let reg = /"([\w\W]+)"/;

for (let i = 2; i < datasArry.length; i++) {

    let data = {};
    let line = datasArry[i]
    let lineToArray = line.split(',');
    for (let j = 0; j < columns.length; j++) {
        data[columns[j]] = lineToArray[j]
    }

    let match = line.match(reg);
    data.roundDetails = match[1];
    data.roundDetails = data.roundDetails.replace(/""/g, '"')

    JSON.parse(data.roundDetails) // 驗證字串是否符合JSON格式

    datas_ok.push(data);

}

console.log(datas_ok);