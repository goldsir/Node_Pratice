import { Vue, webPath } from './common';

const vm = new Vue({

    el: '#app'
    , data: {
        categoryId: 0
        , categories: []
        , articles: []
    }
    , computed: {
        filter_articles() {
            if (this.categoryId === 0) {
                return this.articles;
            }
            else {
                // 還沒寫
                return this.articles;
            }
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            window.location.href = webPath.page.member_login;

        }
        , async getCategories() {
            let res = await fetch(webPath.api.article_getCategories);
            this.categories = await res.json();
        }
        , async getArticles() {
            let res = await fetch(webPath.api.article_list);
            this.articles = await res.json();
        }
        , getCategoryById(id) {
            let target = this.categories.find(item => item.id === id);
            if (typeof target === 'undefined') {
                alert(id + '怪怪的')
            }
            return this.categories.find(item => item.id === id).category;
        }
    },
    async mounted() {
        await this.getCategories();
        await this.getArticles();
    }
});