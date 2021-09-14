import { Vue } from './common'

let vm = new Vue({

    el: "#app"
    , data: {
        account: ""
        , password: ""
        , registerAPI: "/api/member/register"
    }
    , methods: {
        register(e) {
            console.log(this);
            console.log(e);
        }
    }
});