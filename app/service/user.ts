import { Service } from 'egg'
export default class UserService extends Service {
    // 用户登录
    async userLogin(params) {
        const { app } = this
        let userLoginInfo = await app.mysql.select('user', { where: params })
        if (userLoginInfo.length > 0) {
            delete userLoginInfo[0].passWord
            delete userLoginInfo[0].is_delete
        }
        return userLoginInfo
    }
    // 获取用户信息
    async userInfo(params) {
        const { app } = this
        const userWhere = {
            where: params
        }
        let userInfo = await app.config.mysql.select('user', userWhere)
        if (userInfo.length > 0) {
            delete userInfo[0].passWord
            delete userInfo[0].is_delete
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
        console.log(updateParams, 'updateParams')
        const updateStatus = await app.config.mysql.update('user', updateParams, options)
        return updateStatus.affectedRows
    }
    // 上传用户头像
    async uploadUserAvatar(params) {
        const { app } = this
        const { userId, avatar } = params
        const row = {
            avatar
        }
        const options = {
            where: {
                userId
            }
        }
        const result = await app.config.mysql.update('user', row, options)
        return result
    }
    // 查看该用户名是否存在
    async checkUserName(params) {
        const { app } = this
        const userWhere = {
            where: params
        }
        const userInfo = await app.config.mysql.select('user', userWhere)
        return userInfo
    }
    // 新增用户
    async insertUser(params) {
        const { app } = this
        const insertStatus = await app.config.mysql.insert('user', params)
        return insertStatus.affectedRows
    }
}
