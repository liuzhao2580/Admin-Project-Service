const { no_data_success, no_data_failed, data_failed, data_success } = require('../utils/reponse_data')

const Controller = require('egg').Controller

class ArticleController extends Controller {
    // 文章列表 获取所有数据
    async get_articleList() {
        const { ctx, service } = this
        const data = await service.article.findAllList()
        ctx.body = data_success(data)
    }
    // 查询文章
    async get_articleQuery() {
        const {ctx, service} = this
        const params = ctx.params.id
        const result = await service.article.article_query(params)
        if(result.length > 0) ctx.body = data_success(result[0])
        else ctx.body = no_data_failed(101,'未查询到文章')
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
                // 文章类别
                article_category: {
                    type: 'int',
                    required: true,
                    convertType: 'int'
                }
            })
            const result = await service.article.article_insert(params)
            if(result.affectedRows == 1) ctx.body = no_data_success('新增成功')
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
        const {ctx, service} = this
        const params = {
            id: ctx.params.id
        }
        const result = await service.article.article_delete(params)
        if(result.affectedRows == 1) ctx.body = no_data_success('删除成功')
        else ctx.body = no_data_failed(101,'删除失败')
    }
}

module.exports = ArticleController
