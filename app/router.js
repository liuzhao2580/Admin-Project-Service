'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    app.router.prefix('/v1/api')
    // 用户
    require('./router/user')(app)
    // 首页
    require('./router/dashboard')(app)
    // 文章
    require('./router/article')(app)
    // gadget 小工具接口
    require("./router/gadget")(app)
}
