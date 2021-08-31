let data = {
    id: '16986866b398df58b5e5bf29',
    startedAt: '2021-08-05T12:20:55.603Z',
    settledAt: '2021-08-05T12:22:35.501Z',
    status: 'Resolved',
    gameType: 'blackjack',
    playerId: 'saikrishna',
    description: 'Bet behind Play seat 6',
    stake: 200,
    payout: 400,
    winlose: 200,
    betid: 'BJ_BetBehindPlaySeat6627890053693570885',
    code: 'BJ_BetBehindPlaySeat6',
    transactionId: '627890053693570885',
    result: '{"dealer":{"score":26,"cards":["9C","5D","2D","TC"],"bonusCards":[]},"seats":{"Seat4":{"score":19,"cards":["4D","6C","9D"],"decisions":[{"type":"Hit"},{"type":"Stand"}],"outcome":"Win","bonusCards":[]},"Seat6":{"score":18,"cards":["KC","8S"],"decisions":[{"type":"Stand"}],"outcome":"Win","bonusCards":[]},"Seat3":{"score":16,"cards":["3H","4H","9C"],"decisions":[{"type":"Hit"},{"type":"Stand"}],"outcome":"Win","bonusCards":[]},"Seat2":{"score":23,"cards":["9H","7H","7H"],"decisions":[{"type":"Hit"}],"outcome":"Bust","bonusCards":[]},"Seat7":{"score":15,"cards":["AD","5S","7D","2H"],"decisions":[{"type":"Hit"},{"type":"Hit"},{"type":"Stand"}],"outcome":"Win","bonusCards":[]},"Seat5":{"score":15,"cards":["QD","5H"],"decisions":[{"type":"Stand"}],"outcome":"Win","bonusCards":[]},"Seat1":{"score":19,"cards":["AH","8S"],"decisions":[{"type":"Stand"}],"outcome":"Win","bonusCards":[]}},"burnedCards":[]}'
}

let reg = /\d+$/;
let found = data.description.match(reg);
console.log(found);
let playerSeat = found[0];

let result = JSON.parse(data.result);



console.log(result.seats[`Seat${playerSeat}`]);

/*
console.log(data.description);

let playerSeat = found[0];
console.log(playerSeat);

let result = JSON.parse(data.result);

console.log(result.seats[`Seat${playerSeat}`]);
*/
