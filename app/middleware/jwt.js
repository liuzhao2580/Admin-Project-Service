const jsonwebtoken = require('jsonwebtoken')
module.exports = () => {
    return async function jwt(ctx, next) {
        const token = ctx.request.header.authorization
        let decode = null
        console.log(ctx.session.token, 1111)
        if (token) {
            try {
                // 解码token
                decode = jsonwebtoken.verify(token, ctx.app.config.jwt.secret)
                await next()
                console.log(decode)
            } catch (error) {
                ctx.status = 401
                ctx.body = {
                    message: error.message
                }
                return
            }
        } else {
            ctx.status = 401
            ctx.body = {
                message: '没有token'
            }
            return
        }
    }
}
