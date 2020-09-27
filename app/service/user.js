const Service = require('egg').Service

class UserService extends Service {
    // 用户登录
    async userLogin(params) {
        const { app } = this
        let userLoginInfo = await app.mysql.select('user', { where: params })
        if (userLoginInfo.length > 0) {
            delete userLoginInfo[0].passWord
        }
        return userLoginInfo
    }
    // 获取用户信息
    async userInfo(params) {
        const { app } = this
        let userInfo = await app.mysql.select('user', { where: params })
        if (userInfo.length > 0) {
            delete userInfo[0].passWord
        }
        return userInfo
    }
    // 更新用户信息
    async updateUserInfo(params) {
        const { app } = this
        const { userId, ...updateParams } = params
        const options = {
            where: {
                userId
            }
        }
        const updateStatus = await app.mysql.update('user', updateParams, options)
        return updateStatus.affectedRows
    }
    // 上传用户头像
    async uploadUser(params) {
        const {app} = this
        const {userId} = params
        const row = {
            userId,
            avatar
        }
        const result = await app.mysql.update('user', row)
        return result
    }
}

module.exports = UserService
