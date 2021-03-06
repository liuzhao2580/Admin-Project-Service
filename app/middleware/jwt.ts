import { verifyToken } from "../utils/jwt"
import { Context } from "egg"
export default () => {
  return async function jwt(ctx: Context, next) {
    const token = ctx.request.header.authorization
    let decode
    /**
     * 1.如果token存在 捕获项目中的问题的同时捕获token校验的问题
     * 2.捕获token校验的问题，如果token出错就直接返回错误问题，并且阻止流程执行
     */
    if (token) {
      try {
        // 解码token，如果在解码token的过程中出现问题，就阻止流程
        try {
          decode = await verifyToken(ctx, token)
          ctx.session.userId = decode.userId
        } catch (error) {
          ctx.body = {
            code: 50001,
            msg: error.message,
          }
          return
        }
        await next()
      } catch (error) {
        // 捕获项目代码的问题
        ctx.body = {
          code: 500,
          msg: error.message,
        }
        return
      }
    } else {
      ctx.body = {
        code: 50001,
        msg: "没有token",
      }
      return
    }
  }
}
