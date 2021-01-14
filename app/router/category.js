module.exports = app => {
    // 获取所有文章类别 按照树形结构
    // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
    // app.router.get('/api/category', app.controller.category.get_category)
    // 获取所有文章类别，按照树形结构 多表 不同级别的类别存放在不同的表中
    // app.router.get('/api/category', app.controller.category.get_moreTable_category)
    // 获取文章类别，按照懒加载的形式
    app.router.post('/category', app.controller.category.lazy_category)
}