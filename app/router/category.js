module.exports = app => {
    // 获取所有文章类别 按照树形结构
    app.router.get('/api/category', app.controller.category.get_moreTable_category)
}