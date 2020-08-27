'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
    // 用户
    require('./router/user')(app)
    // 文章
    require('./router/article')(app)
}
