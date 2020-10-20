const Service = require('egg').Service

class ArticleService extends Service {
    // 文章列表 获取所有数据
    async findAllList() {
        const {app} = this
        const result = await app.mysql.select("article", {where: {is_delete: 0}})
        return result
    }
    // 查询该文章和该用户是否匹配，判断文章是否被该用户创建
    /**
     * @param {object} params 包含文章id和用户id 
     */
    async article_confirm(params) {
        const {app} = this
        const options = {
            where: params
        }
        const result = await app.mysql.select('article', options)
        return result
    }
    // 查询文章
    async article_query(id) {
        const {app} = this
        const options = {
            where: {id, is_delete: 0}
        }
        const result = await app.mysql.select("article", options)
        return result
    }
    // 新增文章
    async article_insert(params) {
        const {app} = this
        const result = await app.mysql.insert('article', params)
        return result
    }
    // 更新文章
    async article_update(params) {
        const {app} = this
        const {id, creator_id, ...update_row} = params
        const options = {
            where: {
                id,creator_id
            }
        }
        const result = await app.mysql.update('article', update_row, options)
        return result
    }
    // 删除文章
    async article_delete(id) {
        const {app} = this
        const options = {
            where: id
        }
        const row = {
            is_delete: 1
        }
        const result = await app.mysql.update('article',row , options)
        return result
    }
    // 添加文章评论
    async articleComment_insert(params) {
        const {app, service} = this
        let result
        const articleFlag = await this.article_query(params.comment_article_id)
        const userFlag = await service.user.userInfo(params.comment_userId)
        if(articleFlag.length == 0) result = {code: 104, msg: '该文章不存在'}
        else if(userFlag.length == 0) result = {code: 104, msg: '该用户不存在'}
        else {
            result = await app.mysql.insert('article_comment',params)
        }
        return result
    }
}

module.exports = ArticleService