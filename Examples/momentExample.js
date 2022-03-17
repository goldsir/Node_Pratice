const moment = require('moment');

let start = moment().subtract(5, 'minutes').format('YYYY-MM-DD hh:mm:ss');
let end = moment().subtract(0, 'minutes').format('YYYY-MM-DD hh:mm:ss');

console.log(start, end);