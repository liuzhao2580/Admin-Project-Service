import jwt from 'jsonwebtoken'

// 生成token
export const setToken = (data, expiresIn = '1d') => {
    return jwt.sign(data, app.config.jwt.secret, { expiresIn })
}
// 解密 token
export const verifyToken = data => {
    const getToken = data.split('Bearer ')[1]
    return jwt.verify(getToken, app.config.jwt.secret, (err, decoded) => {
        return new Promise((resolve, reject) => {
            if (err) reject(err)
            else resolve(decoded)
        })
    })
}
