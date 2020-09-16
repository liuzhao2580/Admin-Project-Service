const { data_success, no_data_failed, no_data_success } = require('../utils/reponse_data')

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
        const {service, ctx} = this
        const result = await service.category.select_moreTableCategory()
        let result_arr = []
        if(result.length > 0) {
            // typeArr 查询到的数组 
            function type_looper(typeArr, first_id) {
                // 查询最外层的数据
                const first_typeArr = typeArr.filter(item => item.first_id == first_id)
            }
            result_arr = result.filter(item => {
                return result.filter(items => {
                    return item.first_id == items.first_id
                })
            })
            console.log(result_arr, 1111)
        }
        ctx.body = data_success(result)
    }
}

module.exports = Category
