module.exports = app =>{
    // 文章列表 获取所有数据
    app.router.get('/api/article/list', app.controller.article.get_articleList)
}