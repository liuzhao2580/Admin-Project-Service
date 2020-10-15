const { SeniverseV3 } = require('seniverse-api')
const setSeniverseApi = new SeniverseV3({
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


module.exports = {
    seniverseApi(location){
        setSeniverseApi.options.query.location = location
        return setSeniverseApi
    },
    errorList: {
        AP010001: 'API 请求参数错误',
        AP010002: '没有权限访问这个 API 接口。在此查看你有权访问的 API 接口',
        AP010003: 'API 密钥 key 错误',
        AP010004: '签名错误',
        AP010005: '你请求的 API 不存在',
        AP010006: '没有权限访问这个地点',
        AP010007: 'JSONP 请求需要使用签名验证方式',
        AP010008: '没有绑定域名。请在控制台对应的产品管理下进行域名绑定',
        AP010009: 'API 请求的 user-agent 与你设置的不一致',
        AP010010: '没有这个地点',
        AP010011: '无法查找到指定 IP 地址对应的城市',
        AP010012: '你的服务已经过期。在此续费',
        AP010013: '访问量余额不足。在此购买',
        AP010014: '访问频率超过限制',
        AP010015: '暂不支持该城市的车辆限行信息',
        AP010016: '暂不支持该城市的潮汐数据',
        AP010017: '请求的坐标超出支持的范围',
        AP100001: '系统内部错误：数据缺失',
        AP100002: '系统内部错误：数据错误',
        AP100003: '系统内部错误：服务内部错误',
        AP100004: '系统内部错误：网关错误'
    }
}
