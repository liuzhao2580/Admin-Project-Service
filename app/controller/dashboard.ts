const { data_success } = require('../utils/reponse_data')
const { getMathRandom } = require('../utils/tool')

import { Controller } from 'egg'

export default class Dashboard extends Controller {
    /** Echarts 的数据 */
    async get_EchartsData() {
        const { ctx } = this
        const echartsData = {
            line: [
                {
                    name: 'Vue',
                    type: 'line',
                    data: getMathRandom(1000, 9999, 7)
                },
                {
                    name: 'React',
                    type: 'line',
                    data: getMathRandom(1000, 9999, 7)
                },
                {
                    name: 'Angular',
                    type: 'line',
                    data: getMathRandom(1000, 9999, 7)
                }
            ],
            bar: [
                {
                    name: 'Vue',
                    type: 'bar',
                    data: getMathRandom(1000, 9999, 7)
                },
                {
                    name: 'React',
                    type: 'bar',
                    data: getMathRandom(1000, 9999, 7)
                },
                {
                    name: 'Angular',
                    type: 'bar',
                    data: getMathRandom(1000, 9999, 7)
                }
            ],
            pie: [
                { value: getMathRandom(1000, 9999)[0], name: 'Vue' },
                { value: getMathRandom(1000, 9999)[0], name: 'React' },
                { value: getMathRandom(1000, 9999)[0], name: 'Angular' }
            ]
        }
        ctx.body = data_success(echartsData)
    }
}

