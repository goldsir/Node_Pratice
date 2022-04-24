//  import reactive.js 2次， 但 reactive.js 只會執行一次

import { reactive, shallowReactive, readonly } from './reactive.js'
import { shallowReadonly } from './reactive.js'
import { effect } from './effect.js'
//-----------------------------------------------------------------


let state = reactive({ name: 'BABABA', scores: [1, 2, 3] });

effect(() => {
    //app.innerHTML = `name: ${state.name} - scores: ${state.scores.join('')}`
    app.innerHTML = state.scores;
});

setTimeout(() => {


    //state.scores[2] = '100'
    //state.scores[3] = '999'

}, 1000);