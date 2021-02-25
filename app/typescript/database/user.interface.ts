/** 存放在数据库 中的 用户基本信息 */
export interface IUser {
  /** 用户 id */
  id: string
  /** 用户名 */
  userName: string
  /** 权限 id */
  roleId: string
  /** 权限 中文名 */
  roleName: string
  /** 头像 */
  avatar: string
  /** 密码 */
  password: string
  /** 昵称 */
  nickName: string
  /** 性别 */
  gender: string
  /** 电话 */
  phone: string
  /** Email */
  email: string
  /** 创建时间 */
  createTime: Date
  /** 是否删除 */
  is_delete: number
}
