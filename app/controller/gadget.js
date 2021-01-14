const Controller = require('egg').Controller
const { data_success, data_failed } = require('../utils/reponse_data')
const { seniverseApi, errorList } = require('../utils/seniverse-api')
class Gadget extends Controller {
    // 获取天气 使用的是心知天气提供的api https://www.seniverse.com/docs
    async get_Weather() {
        const { ctx } = this
        const { location } = ctx.query
        try {
            const response = await seniverseApi(location).weather.now.data()
            ctx.body = data_success(response)
        } catch (error) {
            ctx.body = data_failed(100, errorList[error.signal])
        }
    }
}

module.exports = Gadget
