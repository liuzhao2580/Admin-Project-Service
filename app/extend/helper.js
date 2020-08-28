const jwt = require('jsonwebtoken')
module.exports = {
    // 生成token
    setToken(data, expiresIn = '1h') {
        return jwt.sign(data, this.app.config.jwt.secret, { expiresIn})
    },
    // 解密 token
    verifyToken(data) {
        const getToken = data.split('Bearer ')[1]
        return jwt.verify(getToken, this.app.config.jwt.secret)
    }
}