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

            let res = await fetch(`${webPath.api.article_getArticleAndAllReplies}/${this.articleId}`);
            let json = await res.json();
            if (json.resultCode === 0) {




                let map = json.result.map((data) => {
                    let match = data.nodePath.match(/,/g);
                    if (match === null) {
                        data.ident = 0;
                    }
                    else {
                        data.ident = match.length;
                    }
                    return data
                });

                this.article = map;


            }
            else {
                window.location.href = webPath.page.article_list;
            }
        },

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
        }
    },
    async mounted() {
        await this.getArticleById();
    }
});