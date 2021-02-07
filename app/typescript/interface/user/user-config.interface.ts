import { IUser } from '@/typescript/database/user.interface'
/** 用户 的一些基本 定义 */

/** 1. 用户登录 */
export type IUserLoginParams = Pick<IUser, 'userName' | 'password'>

/** 2. 获取用户基本信息 */
export type IUserInfoParams = Pick<IUser, 'id'>
