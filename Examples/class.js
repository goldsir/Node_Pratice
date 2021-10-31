class Person {

    constructor(name) {
        this.name = name;
    }

    say() {
        console.log(this.name);
    }
}

let p1 = new Person('123');
let p2 = new Person('456');

console.log(p1.say === Person.prototype.say);