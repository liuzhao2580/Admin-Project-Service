import { sign, verify } from "jsonwebtoken"
import { Context } from "egg"
/** 生成token */
export const setToken = (ctx: Context, data, expiresIn = "1d") => {
  return sign(data, ctx.app.config.jwt.secret, { expiresIn })
}

/** 解密 token */
export const verifyToken = (ctx: Context, data) => {
  const getToken = data.split("Bearer ")[1]
  return verify(getToken, ctx.app.config.jwt.secret, (err, decoded) => {
    return new Promise((resolve, reject) => {
      if (err) reject(err)
      else resolve(decoded)
    })
  })
}
