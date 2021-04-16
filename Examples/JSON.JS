let str = `{"name":"jeGG", "action":"哭鼻子"}`;

let objFromStr = JSON.parse(str);

console.log(typeof objFromStr);
console.log(objFromStr);
console.log(objFromStr.name);
console.log(objFromStr.action);