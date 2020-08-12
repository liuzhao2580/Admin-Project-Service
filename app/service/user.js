const Service = require('egg').Service

class UserService extends Service {
    // 用户登录
    async userLogin(params) {
        const {app} = this
        let userLoginInfo = await app.mysql.select('user', {where: params})
        if(userLoginInfo.length > 0) {
            delete userLoginInfo[0].passWord
        }
        return userLoginInfo
    }
    // 获取用户信息
    async userInfo(params) {
        const {app} = this
        let userInfo = await app.mysql.select('user', {where: params})
        if(userInfo.length > 0) {
            delete userInfo[0].passWord
        }
        return userInfo
    }
}

module.exports = UserService