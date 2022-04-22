const { reactive
    , shallowReactive
    , readonly
    , shallowReadonly } = require('./reactive')


let state = reactive({ name: 'abc', age: { val: 100 } });

console.log(state.name);
console.log(state.name);
console.log(state.name);