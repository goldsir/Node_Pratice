import { Vue } from './common'

let vm = new Vue({

    el: "#app"
    , data: {
        account: "TC001"
        , password: "123456"
        , tips1: "請輸入帳號"
        , tips2: "請輸入密碼"
        , api: "/member/login"
        , result: {
            Code: 0
            , Message: ''
        }
    }
    , methods: {
        async login() {
            this.result.Code = 0;

            if (this.account === '') {
                this.result.Code = 1;
                this.result.Message = '請輸入帳號';
            }
            else if (this.password === '') {
                this.result.Code = 1;
                this.result.Message = '請輸入密碼';
            } else {

                //防呆通過，將資料送給API
                const params = new URLSearchParams();
                params.append('account', this.account);
                params.append('password', this.password);

                let fetchOptions = {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    , method: 'POST'
                    , body: params
                };

                try {
                    let response = await fetch(this.api, fetchOptions);
                    let responseJSON = await response.json();
                    this.result.Code = responseJSON.resultCode;
                    this.result.Message = responseJSON.resultMessage;

                    if (this.result.Code === 0) {
                        console.log('登入成功', responseJSON.result);
                        localStorage.setItem('LoginSId', responseJSON.result);
                    }
                }
                catch (err) {
                    this.result.Code = 1;
                    this.result.Message = err.Message;
                }
            }
        }
    }
});