const {SeniverseV3}  = require("seniverse-api")
const seniverseApi = new SeniverseV3({
    encryption: {
        uid: 'PhO-St0kgR8oPvLPw', // 公钥
        key: 'SMcZkWoIk_3o4lMX2', // 私钥
        ttl: 100, // 签名失效时间，单位为秒
        enabled: true // 是否进行签名验证
    },
    query: {
        timeouts: [3000, 5000, 7000] // 调用 API 时重试次数以及 timeout 时间，单位为毫秒
    }
})

module.exports = (location)=> {
    seniverseApi.options.query.location = location
    return seniverseApi
}