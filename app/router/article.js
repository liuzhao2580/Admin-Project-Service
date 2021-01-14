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

    //--------------------------------------------文章分类---------------------------------------
    // 获取所有文章类别 按照树形结构
    // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
    // app.router.get('/api/category', app.controller.category.get_category)
    // 获取所有文章类别，按照树形结构 多表 不同级别的类别存放在不同的表中
    // app.router.get('/api/category', app.controller.category.get_moreTable_category)
    // 获取文章类别，按照懒加载的形式
    app.router.post('/category', app.controller.article.lazy_category)
    //--------------------------------------------文章分类---------------------------------------
}