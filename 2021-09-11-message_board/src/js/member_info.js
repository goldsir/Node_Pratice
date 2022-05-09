import { Vue } from './common';
import { getTokenPayLoad } from './member_checkLogin';

let vm = new Vue({

    el: "#app"
    , data: {
    }
    , computed: {
        account() {
            let payLoad = getTokenPayLoad();
            let userData = JSON.parse(payLoad);
            return userData.account;
        }
    }
});