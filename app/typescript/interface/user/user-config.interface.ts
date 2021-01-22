import { IUser } from '@/typescript/database/user.interface'
/** 用户 的一些基本 定义 */
/** 1. 用户登录 */
export interface IUserLoginParams extends Pick<IUser, 'userName' | 'password'> {}

/** 2. 获取用户基本信息 */
export interface IUserInfoParams extends Pick<IUser, 'id'>{}
