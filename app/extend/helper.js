const jwt = require('jsonwebtoken')
module.exports = {
    // 生成token
    setToken(data, expiresIn = '1h') {
        return jwt.sign(data, this.app.config.jwt.secret, { expiresIn})
    }
}