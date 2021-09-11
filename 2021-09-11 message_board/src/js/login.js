import { Vue } from './common'

let vm = new Vue({

    el: "#app"
    , data: {
        account: ""
        , password: ""
        , tips1: "請輸入帳號"
        , tips2: "請輸入密碼"
        , loginAPI: "/api/user/login"
    }
    , methods: {
        login(e) {
            console.log(this);
            console.log(e);
        }
    }
});