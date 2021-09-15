import { Vue } from './common'

let vm = new Vue({

    el: "#app"
    , data: {
        account: "TC001"
        , password: "123456"
        , password2: "123456"
        , api: "/member/register"
        , result: {
            Code: 0
            , Message: ''
        }
    }
    , methods: {

        async register(e) {

            this.result.Code = 0;

            if (this.account === '') {
                this.result.Code = 1;
                this.result.Message = '請輸入帳號';
            }
            else if (this.password === '') {
                this.result.Code = 1;
                this.result.Message = '請輸入密碼';
            }
            else if (this.password != this.password2) {
                this.result.Code = 1;
                this.result.Message = '2次密碼不一致';
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
                    let result = await response.json();
                    this.result.Code = result.resultCode;
                    this.result.Message = result.resultMessage;

                    if (this.result.Code === 0) {
                        alert(this.result.Message);

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