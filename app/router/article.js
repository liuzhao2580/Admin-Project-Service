module.exports = app =>{
    // 文章列表 获取所有数据
    app.router.get('/article/list', app.controller.article.get_articleList)
    // 查询文章
    app.router.get('/article/:id',app.controller.article.get_articleQuery)
    // 文章新增
    app.router.post('/article/insert', app.controller.article.post_articleInsert)
    // 文章更新
    app.router.patch('/article/update', app.controller.article.patch_articleUpdate)
    // 删除文章
    app.router.delete('/article/delete/:id', app.controller.article.delete_articleDelete)
    // 添加文章评论
    app.router.post('/articleComment/insert',app.controller.article.post_articleCommentInsert)
}