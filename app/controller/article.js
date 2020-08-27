const Controller = require('egg').Controller

class ArticleController extends Controller {
    // 文章列表 获取所有数据
    async get_articleList() {
        const {ctx, service} = this
        const data = await service.article.findAllList()
        ctx.body = ctx.helper.baseResponse(0,'请求成功',data)
    }
}

module.exports = ArticleController