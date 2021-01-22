import { Controller } from 'egg'
import {
    no_data_success,
    no_data_failed,
    data_failed,
    data_success
} from '../utils/reponse_data'
export default class ArticleController extends Controller {
    // 文章列表 获取所有数据
    async get_articleList() {
        const { ctx, service } = this
        const data = await service.article.findAllList()
        ctx.body = data_success(data)
    }
    // 查询文章
    async get_articleQuery() {
        const { ctx, service } = this
        const params = ctx.params.id
        const result = await service.article.article_query(params)
        if (result.length > 0) ctx.body = data_success(result[0])
        else ctx.body = no_data_failed(101, '未查询到文章')
    }
    // 新增文章
    async post_articleInsert() {
        const { ctx, service } = this
        try {
            const params = ctx.request.body
            ctx.validate({
                // 用户id
                creator_id: {
                    type: 'id',
                    required: true
                },
                // 文章标题
                article_title: {
                    type: 'string',
                    required: true
                },
                // 文章内容
                article_content: {
                    type: 'string',
                    required: true
                },
                // 文章类别 id
                article_categoryId: {
                    type: 'string',
                    required: true,
                    convertType: 'string'
                },
                // 类别的父级 id
                category_parentId: {
                    type: 'string',
                    required: true,
                    convertType: 'string'
                }
            })
            const result = await service.article.article_insert(params)
            if (result.affectedRows == 1) ctx.body = no_data_success('新增成功')
            else ctx.body = no_data_failed(101, '新增失败')
        } catch (error) {
            ctx.body = data_failed(100, error.errors)
        }
    }
    // 更新文章
    async patch_articleUpdate() {
        const { ctx, service } = this
        try {
            ctx.validate({
                // 文章id
                id: {
                    type: 'id',
                    required: true
                },
                // 用户id
                creator_id: {
                    type: 'id',
                    required: true
                },
                // 文章标题
                article_title: {
                    type: 'string',
                    required: true
                },
                // 文章内容
                article_content: {
                    type: 'string',
                    required: true
                },
                // 文章类别
                article_category: {
                    type: 'int',
                    required: true,
                    convertType: 'int'
                }
            })
            const { id, creator_id } = ctx.request.body
            const confirm_params = {
                id,
                creator_id
            }
            // 首先确定 文章和用户是否匹配
            const confirm_result = await service.article.article_confirm(confirm_params)
            if (confirm_result.length > 0) {
                const update_result = await service.article.article_update(ctx.request.body)
                // 修改成功
                if (update_result.affectedRows == 1) {
                    ctx.body = no_data_success('修改成功')
                }
                // 修改失败
                else {
                    ctx.body = no_data_failed(101, '修改失败')
                }
            } else {
                ctx.body = no_data_failed(100, '该文章不是该用户创建，无法编辑')
            }
        } catch (error) {
            ctx.body = data_failed(100, error.errors)
        }
    }
    // 删除文章
    async delete_articleDelete() {
        const { ctx, service } = this
        const params = {
            id: ctx.params.id
        }
        const result = await service.article.article_delete(params)
        if (result.affectedRows == 1) ctx.body = no_data_success('删除成功')
        else ctx.body = no_data_failed(101, '删除失败')
    }
    // 添加文章评论
    async post_articleCommentInsert() {
        const { ctx, service } = this
        try {
            ctx.validate({
                comment_userId: { required: true, type: 'int', convertType: 'int' },
                comment_article_id: { required: true, type: 'int', convertType: 'int' },
                comment_content: { required: true, type: 'string' }
            })
            const params = ctx.request.body
            let result = await service.article.articleComment_insert(params)
            // 说明 用户不存在 或者 文章不存在
            if (result.code === 104) ctx.body = data_failed(result.code, result.msg)
            if (result.affectedRows == 1) ctx.body = no_data_success('评论成功')
            else ctx.body = no_data_failed(101, '评论失败')
        } catch (error) {
            ctx.body = data_failed(100, error)
        }
    }

    //--------------------------------------------文章分类---------------------------------------
    // 获取所有文章类别 按照树形结构 表 article_category 把类别都集中在一个表中
    async get_category() {
        const { ctx, service } = this
        const result = await service.article.select_category()
        // 说明存在数据，需要将数据结构重构为树形
        let respon_data:any[] = []
        if (result.length > 0) {
            function type_looper(data, up_data:any[] = [], level = 1) {
                let get_category: any[] = []
                // 上一级类别
                const get_up_data = data.filter(item => item.level == level)
                // 说明能找到相应的数据
                if (get_up_data.length > 0) {
                    // 说明data 中还存在的下级类别
                    if (get_up_data.length < data.length) {
                        // 首先获取的数据为下一级
                        const get_down_data = data.slice(get_up_data.length)
                        const respon_data:any[] = type_looper(get_down_data, get_up_data, level + 1)
                        if (respon_data.some(item => !item.parent_id)) get_category = respon_data
                        up_data.forEach(up_item => {
                            const getFlag = respon_data.filter(down_item => {
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
                        up_data.forEach(up_item => {
                            const getFlag = get_up_data.filter(down_item => {
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
        const result = await service.article.select_moreTableCategory()
        let result_arr:any[] = []
        if (result.length > 0) {
            // 用来记录当前的索引，从-1开始
            let times = -1
            result.forEach(item => {
                const getArr = result_arr.find(result_item => {
                    return item.first_id == result_item.id
                })
                // 说明找到了相符的数据，代表是子节点，需要push
                if (getArr) {
                    result_arr[times].children.push({
                        id: `${item.first_id}-${item.sec_id}`,
                        article: item.sec_category
                    })
                }
                // 说明没找到相符的数据，代表是根节点，同时还需要把 times自增+1
                else {
                    times++
                    // 说明存在二级节点
                    if (item.sec_id) {
                        result_arr.push({
                            id: item.first_id,
                            article: item.first_category,
                            children: [
                                {
                                    id: `${item.first_id}-${item.sec_id}`,
                                    article: item.sec_category
                                }
                            ]
                        })
                    }
                    // 说明不存在二级节点
                    else {
                        result_arr.push({
                            id: item.first_id,
                            article: item.first_category
                        })
                    }
                }
            })
        }
        ctx.body = data_success(result_arr)
    }
    // 获取文章类别，按照懒加载的形式
    async lazy_category() {
        const { service, ctx } = this
        try {
            const params = ctx.request.body
            ctx.validate({
                // 用户传递的节点id
                id: {
                    type: 'id',
                    required: false
                },
                // 传递的级别
                level: {
                    type: 'int',
                    required: true,
                    convertType: 'int'
                }
            })
            const result = await service.article.select_lazy_category(params)
            if (result) ctx.body = data_success(result)
            else ctx.body = data_success([])
        } catch (error) {
            ctx.body = data_failed(100, error.errors)
        }
    }
    //--------------------------------------------文章分类---------------------------------------
}

