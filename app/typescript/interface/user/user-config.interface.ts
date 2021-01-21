/** 用户 的一些基本 定义 */
/** 1. 用户登录 */
export interface IUserLoginParams {
    userName: string
    password: string
}

/** 2. 获取用户基本信息 */
export interface IUserInfoParams {
    userId: string
}