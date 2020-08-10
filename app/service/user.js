const Service = require('egg').Service

class UserService extends Service {
    // 用户登录
    async userLogin(params) {
        const {app} = this
        const userLoginInfo = await app.mysql.select('user', {where: params})
        return userLoginInfo
    }
}

module.exports = UserService