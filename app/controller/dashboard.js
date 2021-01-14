const { data_success } = require('../utils/reponse_data')

const Controller = require('egg').Controller

class Dashboard extends Controller {
    /** Echarts 的数据 */
    async get_EchartsData() {
        const { ctx } = this
        console.log(123, '123')
        ctx.body = 123
    }
} 

module.exports = Dashboard