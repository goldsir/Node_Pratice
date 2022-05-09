const mysql = require('mysql');

let text = 'I\'m super man';
text = mysql.escape(text);
console.log(text);
console.dir(text);