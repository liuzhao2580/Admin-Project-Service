module.exports = app => {
    // 用户登录
    app.router.post('/login',app.controller.user.post_userLogin)
    // 获取用户信息
    app.router.get('/api/userInfo/:id', app.controller.user.get_userInfo)
}