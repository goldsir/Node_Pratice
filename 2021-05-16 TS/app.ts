// 型別檢查，TS專用語法只有在CODING的時候有用
// TS只是一層皮，最後都會轉成JS

class Person{
    private name = 'Jess';
    public sayHello(){
        return this.name
    }
}

let p = new Person();