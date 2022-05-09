const webPath = {

    page: {
        member_login: '/member_login.html'
        , member_register: '/member_register.html'
        , member_info: '/member_info.html'
        , article_list: '/article_list.html'
    }
    //---------------------------------------------------
    , api: {
        member_login: '/member/login'
        , member_checkLogin: '/member/checkLogin'
        , member_register: '/member/register'
        , article_add: '/article/add'
        , article_getCategories: '/article/getCategories'
        , article_list: '/article/list'
        , article_getById: '/article'
        , article_reply: '/article/reply'
        , article_getRepliesByArticleId: '/article/getRepliesByArticleId'
        , article_getArticleAndAllReplies: '/article/getArticleAndAllReplies'
    }
}

module.exports = {
    webPath
}