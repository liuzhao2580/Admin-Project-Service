import { Application } from "egg"
export default (app: Application) => {
  // 获取 csrf-token 发送一条随机请求
  app.router.get("/CSRFToken", app.controller.user.CSRFToken)
  // 用户登录
  app.router.post("/login", app.controller.user.post_userLogin)
  // 获取用户信息
  app.router.get("/userInfo/:id", app.controller.user.get_userInfo)
  // 更新用户信息
  app.router.patch("/user/update", app.controller.user.patch_updateUser)
  // 用户上传头像
  app.router.post("/user/upload", app.controller.user.post_upload_avatar)
  // 检查用户名是否存在
  app.router.post("/user/checkUserName", app.controller.user.post_checkUserName)
  // 新增用户
  app.router.post("/user/insert", app.controller.user.post_insertUser)
}
