let str = `{"name":"jeGG", "action":"哭鼻子"}`;  // str 是一個符合JSON格式的字串

let objFromStr = JSON.parse(str);				 // 把 str 轉成一個 object

console.log(typeof objFromStr);  
console.log(objFromStr);
console.log(objFromStr.name);	 // JSON pare成 object 之後，就能用 . 去操作屬性
console.log(objFromStr.action);

/*

	JSON 是一種格式	

*/