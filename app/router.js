'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    // 用户
    require('./router/user')(app)
    // 文章
    require('./router/article')(app)
    // 类别
    require('./router/category')(app)
    // gadget 小工具接口
    require("./router/gadget")(app)
}
