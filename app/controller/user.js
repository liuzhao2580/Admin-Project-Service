const Controller = require('egg').Controller

const  baseResponse = require('../utils/baseResponse')

class UserController extends Controller {
    // 用户登录
    async post_userLogin() {
        const {ctx} = this
        const params = ctx.request.body
        try {
            const data = await this.service.user.userLogin(params)
            ctx.body = baseResponse(data, '用户名或密码错误')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController