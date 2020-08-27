const Controller = require('egg').Controller

class UserController extends Controller {
    // 用户登录
    async post_userLogin() {
        const { ctx, service } = this
        const params = ctx.request.body
        try {
            let data = await service.user.userLogin(params)
            // 如果查询到数据就生成 token
            if (data.length > 0) {
                const token = ctx.helper.setToken({ userId: data[0].userId })
                data[0].token = `${token}`
                ctx.body = ctx.helper.baseResponse(0 ,'请求成功', data[0])
            } else {
                ctx.body = ctx.helper.baseResponse(100, '用户名或密码错误')
            }
        } catch (error) {
            console.log(error)
        }
    }
    // 获取用户基本信息
    async get_userInfo() {
        const { ctx, service } = this
        let params = {
            userId: ctx.params.id
        }
        try {
            const data = await service.user.userInfo(params)
            if (data.length > 0) {
                ctx.body = ctx.helper.baseResponse(0, '请求成功', data[0])
            } else {
                ctx.body = ctx.helper.baseResponse(100, '没有该用户')
            }
        } catch (error) {
            return {}
        }
    }
    // 更新用户信息
    async patch_updateUser() {
        const { ctx, service } = this
        try {
            ctx.validate({
                userId: {
                    required: true,
                    type: 'string'
                },
                phone: {
                    type: 'number',
                    convertType: 'number'
                },
                nickName: {
                    type: 'string',
                    convertType: 'string'
                },
                gender: {
                    type: 'number',
                    convertType: 'number'
                },
                email: 'email'
            })
            const params = {
                userId: ctx.request.body.userId
            }
            const data = await service.user.userInfo(params)
            // 说明该用户存在
            if (data.length > 0) {
                const updateParams = ctx.request.body
                const updateStatus = await service.user.updateUserInfo(updateParams)
                if (updateStatus == 1) {
                    ctx.body = {
                        code: 0,
                        msg: '更新成功'
                    }
                } else {
                    ctx.body = {
                        code: 101,
                        msg: '更新失败'
                    }
                }
            }
            // 说明该用户不存在
            else {
                ctx.body = {
                    code: 100,
                    msg: '该用户不存在'
                }
            }
        } catch (error) {
            ctx.body = {
                code: 101,
                error: error.errors
            }
        }
    }
}

module.exports = UserController
