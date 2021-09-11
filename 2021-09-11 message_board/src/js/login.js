import Vue from 'vue/dist/vue.esm'

let vm = new Vue({

    el: "#app"
    , data: {
        account: "-"
        , password: "-"
    }
    , methods: {
        login(e) {
            console.log(this);
            console.log(e);
        }
    }
});