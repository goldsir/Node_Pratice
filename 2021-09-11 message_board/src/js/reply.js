import { Vue, webPath } from './common';

const vm = new Vue({

    el: '#app'
    , data: {
        article: {}
        , replyContent: ''
        , replies: []
    }
    , methods: {
        async getArticleById() {

            let res = await fetch(`${webPath.api.article_getById}/${this.articleId}`);
            let json = await res.json();
            if (json.resultCode === 0) {
                this.article = json.result;
                document.title = json.result.title;
            }
            else {
                window.location.href = webPath.page.article_list;
            }
        },
        async reply() {

            if (this.replyContent === '') {
                return alert('請輸入內容');
            }

            const params = new URLSearchParams();
            params.append('articleId', this.articleId)
            params.append('content', this.replyContent);
            let token = localStorage.getItem('token') || '';
            let fetchOptions = {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                    , 'token': token
                }
                , method: 'POST'
                , body: params
            }

            try {
                let response = await fetch(webPath.api.article_reply, fetchOptions);
                let json = await response.json();
                if (json.resultCode === 0) {
                    this.getArticleReplies();
                    this.replyContent = '';
                    alert('回文成功')

                }
                else if (json.resultCode == -1) {
                    alert('請登入後回文');
                    window.location.href = webPath.page.member_login;
                }
                else {
                    alert('回文失敗')
                }
            }
            catch (err) {

            }
        }
        , async getArticleReplies() {
            console.log('讀取回文-------', this.articleId);
            let response = await fetch(`${webPath.api.article_getRepliesByArticleId}/${this.articleId}`);
            let json = await response.json();
            this.replies = json.result;
        }
    },
    computed: {
        articleId() {

            let params = (new URL(document.location)).searchParams;
            let id = params.get('id');

            if (id === null) {
                window.location.href = webPath.page.article_list;
            }
            else if (/^\d+$/.test(id) === false) {
                window.location.href = webPath.page.article_list;
            }
            return id;
        },
        isLogin() {
            let token = localStorage.getItem('token') || '';
            if (token === '') {
                return false;
            }
            return true;
        },
        rootId() {
            return this.article.nodePath.split(',')[0];
        }
    },
    async mounted() {
        await this.getArticleById();
        await this.getArticleReplies();
    }
});