const { data_success } = require('../utils/reponse_data')

const Controller = require('egg').Controller

class Category extends Controller {
    // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
    async get_category() {
        const { ctx, service } = this
        const result = await service.category.select_category()
        // 说明存在数据，需要将数据结构重构为树形
        let respon_data = []
        if (result.length > 0) {
            function type_looper(data, up_data = [], level = 1) {
                let get_category = []
                // 上一级类别
                const get_up_data = data.filter((item) => item.level == level)
                // 说明能找到相应的数据
                if (get_up_data.length > 0) {
                    // 说明data 中还存在的下级类别
                    if (get_up_data.length < data.length) {
                        // 首先获取的数据为下一级
                        const get_down_data = data.slice(get_up_data.length)
                        const respon_data = type_looper(get_down_data, get_up_data, level + 1)
                        if (respon_data.some((item) => !item.parent_id)) get_category = respon_data
                        up_data.forEach((up_item) => {
                            const getFlag = respon_data.filter((down_item) => {
                                return up_item.id == down_item.parent_id
                            })
                            if (getFlag.length > 0) {
                                get_category.push({
                                    ...up_item,
                                    children: getFlag
                                })
                            } else {
                                get_category.push({
                                    ...up_item
                                })
                            }
                        })
                    }
                    // 说明 当前的类别已经是最后的
                    else if (get_up_data.length == data.length) {
                        up_data.forEach((up_item) => {
                            const getFlag = get_up_data.filter((down_item) => {
                                return up_item.id == down_item.parent_id
                            })
                            if (getFlag.length > 0) {
                                get_category.push({
                                    ...up_item,
                                    children: getFlag
                                })
                            } else {
                                get_category.push({
                                    ...up_item
                                })
                            }
                        })
                    }
                }
                return get_category
            }
            respon_data = type_looper(result)
        }
        ctx.body = data_success(respon_data)
    }
    // 获取所有文章类别，按照树形结构 多表 不同级别的类别存放在不同的表中
    async get_moreTable_category() {
        const { service, ctx } = this
        const result = await service.category.select_moreTableCategory()
        let result_arr = []
        if (result.length > 0) {
            // 用来记录当前的索引，从-1开始
            let times = -1
            result.forEach((item) => {
                const getArr = result_arr.find((result_item) => {
                    return item.first_id == result_item.id
                })
                // 说明找到了相符的数据，代表是子节点，需要push
                if (getArr) {
                    result_arr[times].children.push({
                        id: `${item.first_id}-${item.sec_id}`,
                        category: item.sec_category
                    })
                }
                // 说明没找到相符的数据，代表是根节点，同时还需要把 times自增+1
                else {
                    times++
                    // 说明存在二级节点
                    if (item.sec_id) {
                        result_arr.push({
                            id: item.first_id,
                            category: item.first_category,
                            children: [
                                {
                                    id: `${item.first_id}-${item.sec_id}`,
                                    category: item.sec_category
                                }
                            ]
                        })
                    }
                    // 说明不存在二级节点
                    else {
                        result_arr.push({
                            id: item.first_id,
                            category: item.first_category
                        })
                    }
                }
            })
        }
        ctx.body = data_success(result_arr)
    }
    // 获取文章类别，按照懒加载的形式
    async lazy_category() {
        const {service, ctx} = this
        const params = ctx.request.body
        const result_arr = await service.category.select_lazy_category(params)
        ctx.body = data_success(result_arr)
    }
}

module.exports = Category
