const Controller = require('egg').Controller

const  baseResponse = require('../utils/baseResponse')

class UserController extends Controller {
    // 用户登录
    async post_userLogin() {
        const {ctx, app} = this
        const params = ctx.request.body
        try {
            let data = await this.service.user.userLogin(params)
            // 如果查询到数据就生成 token
            if(data.length > 0) {
                const token = app.jwt.sign({
                    username: 'liuzhao2580'
                }, app.config.jwt.secret)
                data[0].token = `${token}`
            }
            ctx.body = baseResponse(data, '用户名或密码错误')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController