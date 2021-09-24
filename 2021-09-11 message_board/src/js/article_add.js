import { Vue, webPath } from './common';
import './member_checkLogin';

const vm = new Vue({
    el: "#app"
    , data: {
        categoryId: ""
        , title: ""
        , content: ""
        , postCheckResult: {
            Code: 0
            , Message: ''
        }
        , categoryOptions: []
    },
    methods: {
        async article_add(e) {
            if (this.categoryId === '') {
                this.postCheckResult.Code = 1;
                this.postCheckResult.Message = '請選擇分類';
            }

            else if (this.title === '') {
                this.postCheckResult.Code = 1;
                this.postCheckResult.Message = '請輸入標題';
            }
            else if (this.content === '') {
                this.postCheckResult.Code = 1;
                this.postCheckResult.Message = '請輸入內容';
            } else {
                this.postCheckResult.Code = 0;  // 清掉提示訊息

                console.log('--------發送貼文--------');
                const params = new URLSearchParams();
                params.append('categoryId', this.categoryId);
                params.append('title', this.title);
                params.append('content', this.content);

                let token = localStorage.getItem('token') || '';
                let fetchOptions = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        , 'token': token
                    }
                    , method: 'POST'
                    , body: params
                };

                try {
                    let response = await fetch(webPath.api.article_add, fetchOptions);
                    let result = await response.json();
                    this.postCheckResult.Code = result.resultCode;
                    this.postCheckResult.Message = result.resultMessage;

                    if (result.resultCode === -1) {
                        alert('登入後才可貼文');
                        window.location.href = webPath.page.member_login;
                    }
                    else if (result.resultCode === 0) {
                        alert('貼文成功');
                        window.location.href = webPath.page.article_list;
                    }
                }
                catch (err) {
                    this.postCheckResult.Code = 1;
                    this.postCheckResult.Message = err.Message;
                }
            }

        }, async getCategoryOptions() {
            let res = await fetch(webPath.api.article_getCategories);
            this.categoryOptions = await res.json();
        }
    }
    , async mounted() {
        await this.getCategoryOptions();
    }
});