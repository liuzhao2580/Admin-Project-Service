module.exports = () => {
    return async function jwt(ctx, next) {
        const token = ctx.request.header.authorization
        let decode = null
        if (token) {
            try {
                // 解码token
                decode = ctx.helper.verifyToken(token)
                ctx.session.userId = decode.userId
                await next()
            } catch (error) {
                ctx.body = {
                    code: 50001,
                    message: error.message
                }
                return
            }
        } else {
            ctx.body = {
                code: 50001,
                message: '没有token'
            }
            return
        }
    }
}
