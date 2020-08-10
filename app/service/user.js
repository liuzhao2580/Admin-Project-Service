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
}

module.exports = UserService