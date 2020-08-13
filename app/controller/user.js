const Controller = require('egg').Controller

const baseResponse = require('../utils/baseResponse')

class UserController extends Controller {
    // 用户登录
    async post_userLogin() {
        const { ctx } = this
        const params = ctx.request.body
        try {
            let data = await this.service.user.userLogin(params)
            // 如果查询到数据就生成 token
            if (data.length > 0) {
                const token = ctx.helper.setToken({ userId: data[0].userId })
                data[0].token = `${token}`
                ctx.body = baseResponse(data[0], 0)
            }
            else {
                ctx.body = baseResponse(data, 100, '用户名或密码错误')
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 获取用户基本信息
    async get_userInfo() {
        const { ctx } = this
        let params = {
            userId: ctx.params.id
        }
        try {
            const data = await this.service.user.userInfo(params)
            if (data.length > 0) {
                ctx.body = baseResponse(data[0], 0)
            } else {
                ctx.body = baseResponse(data, 100, '没有该用户')
            }
        } catch (error) {
            return {}
        }
    }
}

module.exports = UserController
