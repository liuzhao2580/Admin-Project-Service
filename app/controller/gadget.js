const Controller = require("egg").Controller
const { data_success, data_failed } = require("../utils/reponse_data")
const {SeniverseV3}  = require("seniverse-api")
class Gadget extends Controller {
    // 获取天气
    async get_Weather(){
        const {ctx} = this
        const {location} = ctx.query
        // 和风天气 https://dev.heweather.com/docs/api/geo 提供的api接口
        const key = '904c576bd6b24067b3b63c8c492031d9'
        const requestUrl = `https://geoapi.heweather.net/v2/city/lookup?key=${key}&&location=${location}`
        // try {
        //     const response = await ctx.curl(requestUrl, { dataType: 'json' })
        //     ctx.body = data_success(response)
        // } catch (error) {
        //     console.log(error, 1111)
        //     ctx.body = data_failed(100,error)
        // }
        const seniverseApi = new SeniverseV3({
            encryption: {
                uid: 'PhO-St0kgR8oPvLPw', // 公钥
                key: 'SMcZkWoIk_3o4lMX2', // 私钥
                ttl: 100, // 签名失效时间，单位为秒
                enabled: true // 是否进行签名验证
            }
        })
        const response = await seniverseApi.weather.now.data({location:'武汉'})
        ctx.body = data_success(response)
    }
}

module.exports = Gadget