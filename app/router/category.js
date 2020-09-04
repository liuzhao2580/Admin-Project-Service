module.exports = app => {
    // 获取所有部门 按照树形结构
    app.router.get('/api/category', app.controller.category.get_category)
}