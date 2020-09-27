module.exports = app => {
    // 用户登录
    app.router.post('/login',app.controller.user.post_userLogin)
    // 获取用户信息
    app.router.get('/api/userInfo/:id', app.controller.user.get_userInfo)
    // 更新用户信息
    app.router.patch('/api/updateUser',app.controller.user.patch_updateUser)
    // 用户上传头像
    app.router.post("/api/user/upload",app.controller.user.post_upload)
}