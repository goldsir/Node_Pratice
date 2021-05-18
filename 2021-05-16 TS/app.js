// 型別檢查，TS專用語法只有在CODING的時候有用
// TS只是一層皮，最後都會轉成JS
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Jess';
    }
    Person.prototype.sayHello = function () {
        return this.name;
    };
    return Person;
}());
var p = new Person();
