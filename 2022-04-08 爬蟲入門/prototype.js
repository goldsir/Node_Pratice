function Student(name, grade) {
    this.name = name;
    this.grade = grade;
}

const stu = new Student('xiaoMing', 6);

console.log(Object.getPrototypeOf(Student));
console.log(Reflect.getPrototypeOf(stu));