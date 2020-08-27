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
    },
    // 设置统一的数据返回格式
    /**
     * 
     * @param {number} code 返回的状态码 
     * @param {string} msg  返回的文字
     * @param {any} data 返回的数据，可以不传，不传说明数据请求出错
     */
    baseResponse(code, msg='请求失败', data=[] ) {
        let result = null
        if(code === 0) result = {code,data,msg}
        // 请求出错
        else result = {code,msg}
        return result
    }
}