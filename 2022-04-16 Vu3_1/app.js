//  import reactive.js 2次， 但 reactive.js 只會執行一次

import { reactive, shallowReactive, readonly } from './reactive.js'
import { shallowReadonly } from './reactive.js'
import { effect } from './effect.js'
//-----------------------------------------------------------------

debugger
let state = reactive({ name: 'BABABA', age: 8 });

effect(() => {
    app.innerHTML = `name: ${state.name} - age: ${state.age}`
});

effect(() => {
    app.innerHTML = `name: ${state.name} - age: ${state.age} ****`
});

setTimeout(() => {
    state.name = 'aaa'
}, 1000);