import { IUser } from '../typescript/database/user.interface'
import { IUserLoginParams } from '../typescript/interface/user/user-config.interface'
import { Service } from 'egg'
export default class UserService extends Service {
    /** 用户登录 */
    async userLogin(params: IUserLoginParams): Promise<IUser[]> {
        const { app } = this
        let userLoginInfo: IUser[] = await app.mysql.select('user', { where: params })
        return userLoginInfo
    }
    /** 获取用户信息 */
    async userInfo(params) {
        const { app } = this
        const userWhere = {
            where: params
        }
        let userInfo: IUser[] = await app.mysql.select('user', userWhere)
        return userInfo
    }
    /** 更新用户信息 */
    async updateUserInfo(params) {
        const { app } = this
        const { userId, ...updateParams } = params
        const options = {
            where: {
                userId
            }
        }
        console.log(updateParams, 'updateParams')
        const updateStatus = await app.mysql.update('user', updateParams, options)
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
        const result = await app.mysql.update('user', row, options)
        return result
    }
    // 查看该用户名是否存在
    async checkUserName(params) {
        const { app } = this
        const userWhere = {
            where: params
        }
        const userInfo = await app.mysql.select('user', userWhere)
        return userInfo
    }
    // 新增用户
    async insertUser(params) {
        const { app } = this
        const insertStatus = await app.mysql.insert('user', params)
        return insertStatus.affectedRows
    }
}
