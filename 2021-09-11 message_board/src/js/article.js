import { Vue, webPath } from './common';

let params = (new URL(document.location)).searchParams;
let id = params.get('id');

if (id === null) {
    window.location.href = webPath.page.article_list;
}
else if (/^\d+$/.test(id) === false) {
    window.location.href = webPath.page.article_list;
}


const vm = new Vue({

    el: '#app'
    , data: {
        article: {}
        , replyContent: ''
    }
    , methods: {
        async getArticleById(id) {

            let res = await fetch(`${webPath.api.getArticleById}/${id}`);
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

        }
    },
    async mounted() {
        await this.getArticleById(id);
    }
});